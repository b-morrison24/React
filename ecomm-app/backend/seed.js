const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load environment variables
dotenv.config();

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123', //TODO: hash passwords
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
    },
];

const products = [
    {
        name: 'T-shirt',
        description: 'A basic t-shirt',
        price: 19.99,
        inStock: true,
    },
    {
        name: 'Jeans',
        description: 'Comfortable blue jeans',
        price: 39.99,
        inStock: true,
    },
];

const orders = [];

// Connect to MongoDB and seed the data
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');

        // Clear existing documents
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        console.log('Existing data cleared.');

        // Insert seed data for Users and Products
        const insertedUsers = await User.insertMany(users);
        const insertedProducts = await Product.insertMany(products);
        

        // Create orders from the inserted users and products
        const johnDoe = insertedUsers.find(user => user.name === 'John Doe');
        const tShirt = insertedProducts.find(product => product.name === 'T-shirt');

        orders.push({
            userId: johnDoe._id,
            items: [
                {
                productId: tShirt._id,
                quantity: 2,
                },
            ],
            total: tShirt.price * 2,
            status: 'PENDING',
        });

        await Order.insertMany(orders);
        console.log('Seed data inserted.');
        
        // Close the connection
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding the database', error);
        process.exit(1); // Exit with failure
    }
};

// Run the seed function
seedDatabase();