const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/auth');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { validateEmail, validatePassword } = require('../utils/validateInput');

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

            // Validate password
            if (!validatePassword(password)) {
                throw new Error('Password invalid');
            }

            // Validate email
            if (!validateEmail(email)) {
                throw new Error('Email invalid');
            }

            // Hash password
            const hashedPassword = await hashPassword(password);

            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();

            // Generate JWT token
            const token = generateToken(savedUser);

            return { ...savedUser._doc, id: savedUser.id, token };
        },

        loginUser: async (_, { loginInput: { email, password } }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = generateToken(user);

            return { ...user._doc, id: user.id, token };
        },
    },
};

module.exports = userResolvers;
