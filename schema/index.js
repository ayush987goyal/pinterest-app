const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Interest {
        _id: ID!
        title: String!,
        img: String!,
        user: ID!,
        voteCount: Int!,
        votedBy: [String]!
    }

    type User {
        _id: ID!,
        name: String!,
        email: String!,
        pic: String!,
        interests: [ID]!
    }

    type Query {
        allInterests: [Interest!]!

        allUsers: [User]!

        findUser(userEmail: String!): User

        getInterestsOfUser(userId: ID!): [Interest]
    }

    type Mutation {
        addUser(name: String!, email: String!, pic: String!): ID

        addInterest(title: String!, img: String!, userId: ID!): Interest

        removeInterest(interestId: ID!, userId: ID!): String
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});