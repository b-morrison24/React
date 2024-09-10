const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');

const userResolvers = {
    Query: {
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        users: async () => {
            return await User.find();
        },
    },
    Mutation: {
        registerUser: async (_, { registerInput: { name, email, password } }) => {
            // Check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);
            
            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            
            const res = await newUser.save();

            // Generate JWT token
            const token = jwt.sign(
                { userId: res.id, email: res.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
        
            return { ...res._doc, id: res.id, token };
        },
        loginUser: async (_, { loginInput: { email, password } }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new AuthenticationError('Invalid credentials');
            }
        
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            return { ...user._doc, id: user.id, token };
        },
    },
};

module.exports = userResolvers;
