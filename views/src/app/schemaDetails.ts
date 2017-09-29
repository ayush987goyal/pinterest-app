import gql from 'graphql-tag';

export const findUser = gql`
    query findUser($userEmail: String!) {
        findUser(userEmail: $userEmail) {
            _id
            name
            email
            pic
            interests
        }
    }
`;

export const addUser = gql`
    mutation adduser($name: String!, $email: String!, $pic: String!) {
        addUser(name: $name, email: $email, pic: $pic)
    }
`;

export const allInterests = gql`
    query allInterests {
        allInterests {
            _id
            title
            img
            user
            voteCount
            votedBy
        }
    }
`;

export const addInterest = gql`
    mutation addInterest($title: String!, $img: String!, $userId: ID!) {
        addInterest(title: $title, img: $img, userId: $userId)
    }
`;

export const allUsers = gql`
    query allUsers {
        allUsers {
            _id
            name
            email
            pic
        }
    }
`;
