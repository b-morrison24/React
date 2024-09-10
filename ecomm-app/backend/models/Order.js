const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // CartItem model included here
    items: [ 
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING',
    },
}, { timestamps: true});

// Export the Order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;