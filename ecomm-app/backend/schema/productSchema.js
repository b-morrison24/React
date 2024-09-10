const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        inStock: Boolean!
    }

    input ProductInput {
        name: String!
        description: String!
        price: Float!
        inStock: Boolean!
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(productInput: ProductInput): Product
        updateProduct(id: ID!, productInput: ProductInput): Product
        deleteProduct(id: ID!): String
    }
`;

module.exports = productTypeDefs