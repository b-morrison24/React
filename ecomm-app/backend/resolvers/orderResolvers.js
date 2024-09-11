const Order = require('../models/Order');
const Product = require('../models/Product');

const orderResolvers = {
    Query: {
        order: async (_, { id }) => {
            return await Order.findById(id);
        },

        userOrders: async (_, { userId }) => {
            return await Order.find({ userId });
        },
    },

    Mutation: {
        addToCart: async (_, { userId, cartItemInput: { productId, quantity } }) => {
            const product = await Product.findById(productId);

            if (!product) {
                throw new Error('Product not found');
            }

            let order = await Order.findOne({ userId, status: 'PENDING' });
            
            if (!order) {
                order = new Order({ userId, items: [], total: 0, status: 'PENDING' });
            }

            // Check if product is already in cart
            const itemIndex = order.items.findIndex((item) => item.productId.toString() === productId);
            
            if (itemIndex > -1) {
                order.items[itemIndex].quantity += quantity;
            } else {
                order.items.push({ productId, quantity });
            }

            order.total += product.price * quantity;

            return await order.save();
        },

        removeFromCart: async (_, { userId, productId }) => {
            const order = await Order.findOne({ userId, status: 'PENDING' });

            if (!order) {
                throw new Error('No pending order found');
            }

            const itemIndex = order.items.findIndex((item) => item.productId.toString() === productId);

            if (itemIndex > -1) {
                const product = await Product.findById(productId);
                order.total -= product.price * order.items[itemIndex].quantity;
                order.items.splice(itemIndex, 1);
            }

            return await order.save();
        },

        placeOrder: async (_, { userId }) => {
            const order = await Order.findOne({ userId, status: 'PENDING' });

            if (!order) {
                throw new Error('No pending order found');
            }
            // TODO: integrate Stripe API

            order.status = 'COMPLETED';

            return await order.save();
        },
    },
};

module.exports = orderResolvers;
