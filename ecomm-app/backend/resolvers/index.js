const userResolvers = require('./userResolvers');
const productResolvers = require('./productResolvers');
const orderResolvers = require('./orderResolvers');

const resolvers = [userResolvers, productResolvers, orderResolvers];

module.exports = resolvers;