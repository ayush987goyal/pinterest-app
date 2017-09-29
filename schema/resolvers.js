var ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        allInterests: async (root, data, {mongo: {Users, Interests}}) => {
            return await Interests.find({}).toArray();
        },

        allUsers: async (root, data, {mongo: {Users, Interests}}) => {
            return await Users.find({}).toArray();
        },

        findUser: async (root, data, {mongo: {Users, Interests}}) => {
            return await Users.findOne({email: data.userEmail});
        },

        getInterestsOfUser: async (root, data, {mongo: {Users, Interests}}) => {
            const response = await Users.findOne({_id: ObjectId(data.userId)});

            if(response) {
                const interestsArray = response.interests;

                return await Interests.find({ _id: { $in: interestsArray}}).toArray();
            }
        }
    },

    Mutation: {
        addUser: async (root, data, {mongo: {Users, Interests}}) => {
            const newUser = {
                name: data.name,
                email: data.email,
                pic: data.pic,
                interests: []
            }
            const response = await Users.insert(newUser);
            return response.insertedIds[0];
        },

        addInterest: async (root, data, {mongo: {Users, Interests}}) => {
            const newInterest = {
                title: data.title,
                img: data.img,
                user: data.userId,
                voteCount: 0,
                votedBy: []
            }
            const response = await Interests.insert(newInterest);
            const interestId = response.insertedIds[0];

            const newResponse = await Users.update(
                {
                    _id: ObjectId(data.userId)
                },
                {
                    $addToSet: {
                        interests: interestId
                    }
                }
            );
            return response.insertedIds[0];
        }

    }
}