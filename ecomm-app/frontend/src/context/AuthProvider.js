import { createContext, useState } from 'react';
//import { useContext } from 'react';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);  // Set the logged-in user
    };

    const logoutUser = () => {
        setUser(null);  // Clear the user state
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ loginUser, logoutUser, isAuthenticated }}>
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