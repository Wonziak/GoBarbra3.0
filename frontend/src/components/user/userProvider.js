import React, {createContext, useState} from "react";
import Cookies from "js-cookie";
export const UserContext = createContext({ name: '', auth: false });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', auth: false });

    const login = (name) => {
        setUser({
            name: name,
            auth: true,
        });
    };

    const logout = () => {
        Cookies.set('jwt','')
        setUser({
            name: '',
            auth: false,
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
