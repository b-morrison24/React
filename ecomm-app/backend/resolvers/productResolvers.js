const Product = require('../models/Product');

const productResolvers = {
    Query: {
        product: async (_, { id }) => {
            return await Product.findById(id);
        },

        products: async () => {
            return await Product.find();
        },
    },

    Mutation: {
        addProduct: async (_, { productInput: { name, description, price, inStock } }) => {
            const newProduct = new Product({
                name,
                description,
                price,
                inStock,
            });

            return await newProduct.save();
        },

        updateProduct: async (_, { id, productInput }) => {
            return await Product.findByIdAndUpdate(id, productInput, { new: true });
        },

        deleteProduct: async (_, { id }) => {
            await Product.findByIdAndDelete(id);

            return true;
        },
    },
};

module.exports = productResolvers;
