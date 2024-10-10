import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const login = async (userData) => {
    const mutation = `
        mutation LoginUser($loginInput: LoginInput!) {
            loginUser(loginInput: $loginInput) {
            id
            email
            token
            }
        }
    `;

    const variables = {
        loginInput: {
            email: userData.email,
            password: userData.password
        }
    }

    const response = await axios.post(`${API_URL}/graphql`, {
        query: mutation,
        variables: variables,
    });

    if (response.data.errors) {
        response.data.errors.forEach(error => {
            console.error(error.message);
        });
    }

    return response.data.data.loginUser;
};

export const register = async (userData) => {
    const mutation = `
        mutation RegisterUser($registerInput: RegisterInput!) {
            registerUser(registerInput: $registerInput) {
            id
            email
            token
            }
        }
    `;

    const variables = {
        registerInput: {
            email: userData.email,
            password: userData.password,
            name: userData.name,
        }
    }

    const response = await axios.post(`${API_URL}/graphql`, {
        query: mutation,
        variables: variables,
    });

    return response.data.data.registerUser;
};
