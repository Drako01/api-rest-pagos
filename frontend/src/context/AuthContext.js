import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {      
        const user = obtenerUsuarioAutenticado(); 

        if (user) {
            setAuthenticated(true);
            setUserProfile(user);
        } else {
            setAuthenticated(false);
            setUserProfile(null);
        }
    }, []);

    const obtenerUsuarioAutenticado = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;
    };

    const signIn = (userData) => {       
        localStorage.setItem('user', JSON.stringify(userData));        
        setAuthenticated(true);
        setUserProfile(userData);
    };

    const signOut = () => {      
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthenticated(false);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated, userProfile, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
