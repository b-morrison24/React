const { gql } = require('apollo-server-express');

const orderTypeDefs = gql`
    type CartItem {
        productId: ID!
        quantity: Int!
    }

    type Order {
        id: ID!
        userId: ID!
        items: [CartItem!]!
        total: Float!
        status: String!
    }

    input CartItemInput {
        productId: ID!
        quantity: Int!
    }

    type Query {
        order(id: ID!): Order
        userOrders(userId: ID!): [Order]
    }

    type Mutation {
        addToCart(userId: ID!, cartItem: CartItemInput): Order
        removeFromCart(userId: ID!, productId: ID!): Order
        placeOrder(userId: ID!): Order
    }
`;

module.exports = orderTypeDefs
