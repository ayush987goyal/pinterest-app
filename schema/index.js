const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `

`;

module.exports = makeExecutableSchema({typeDefs, resolvers});