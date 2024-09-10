const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userSchema');
const productTypeDefs = require('./productSchema');
const orderTypeDefs = require('./orderSchema');

// Empty types for Apollo to merge individual queries and mutations at the root level of combined schemas
const rootTypeDefs = gql`
    type Query
    type Mutation
`;

module.exports = [
    rootTypeDefs,
    userTypeDefs,
    productTypeDefs,
    orderTypeDefs,
];