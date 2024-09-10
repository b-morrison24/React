const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');  // GraphQL schemas
const resolvers = require('./resolvers');  // GraphQL resolvers
const app = require('./app');

// Initialize and start Apollo Server
async function startServer() {
    const server = new ApolloServer({typeDefs, resolvers})
    await server.start()
    server.applyMiddleware({ app })

    const PORT = process.env.PORT || 3000

    app.listen({ port: PORT}, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
