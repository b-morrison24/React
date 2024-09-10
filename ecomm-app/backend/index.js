const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { ApolloServer, gql } = require('apollo-server-express');
const dotenv = require('dotenv');

//TODO: look into dotenv module
dotenv.config();

// Placeholder for GraphQL schema and resolvers
// gql: template literal tag that converts valid SDL strings to a document
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    category: String!
    description: String!
    price: Float!
    inStock: Boolean!
  }

  type Order {
    id: ID!
    user: User!
    cartItems: [CartItem!]!
    totalPrice: Float!
    status: String!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    token: String
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
  }

  type Query {
    products: [Product]
    orders: [Order]
    user(id: ID!): User
    order(id: ID!): Order
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, category: String!, description: String!, price: Float!, inStock: Boolean!): Product
    register(name: String!, email: String!, password: String!): User
    login(name: String!, password: String!): User
    addCartItem(productId: ID, quantity: Int!): CartItem
    deleteItemFromCart(cartItemId: ID!): String
    placeOrder(userId: ID!): Order
  }
`;

// TODO: build out resolver functionality
const resolvers = {
  Query: {
    products: () => products,
    orders: () => orders,
    user: (parent, args, contextValue, info) => 'Hello',
    order: (parent, args, contextValue, info) => 'Hello',
    product: (parent, args, contextValue, info) => 'Hello',
  },
  Mutation: {
    addProduct: (parent, args) => {},
    register: (parent, args) => {},
    login: (parent, args) => {},
    addCartItem: (parent, args) => {},
    deleteItemFromCart: (parent, args) => {},
    placeOrder: (parent, args) => {}
  }
};

// Main entrypoint
async function startServer() {
    const server = new ApolloServer({typeDefs, resolvers})
    await server.start()
    server.applyMiddleware({ app })

    app.get("/", (req, resp) => {
        resp.send("Hello World")
    });

    app.listen({port: process.env.PORT || 3000}, () => {
        console.log(`E-comm app listening on port 3000${ server.graphqlPath }!`);
    });
}

startServer();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`Mongoose is running...`))
    .catch((err) => console.error(err));
