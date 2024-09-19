import { createContext, useState } from 'react';
//import { useContext } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);  // Set the logged-in user
        // TODO: Set token in localstorage
    };

    const logout = () => {
        setUser(null);  // Clear the user state
        // TODO: Remove token from local storage
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be wrapped in a AuthProvider");
//     }

//     return context;
// }