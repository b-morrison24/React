const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
    },

    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true});

// Export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
