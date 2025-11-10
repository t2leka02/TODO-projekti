
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();
const url = "http://localhost:3001"; 

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');
        return token && email ? { email, token } : null;
    });

    // Login logic: Call backend, store token
    const login = async (email, password) => {
        const response = await axios.post(`${url}/user/signin`, { user: { email, password } });
        const { token, email: userEmail } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', userEmail);
        setUser({ email: userEmail, token });
    };

    // Registration logic: Call backend, then log in
    const register = async (email, password) => {
        await axios.post(`${url}/user/signup`, { user: { email, password } });
        await login(email, password);
    };

    // Logout logic: Clear storage and state
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        setUser(null);
    };

    // The token is used in App.jsx for protected calls
    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };