import React, {createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
export const UserContext = createContext({ token: '', auth: false });


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ token: '', auth: false });

    useEffect(()=>{
        const jwt = Cookies.get("jwt");
        if (jwt){
            setUser({
                token: jwt,
                auth: true,
            });
        }
    },[])

    const login = (token) => {
        setUser({
            token: token,
            auth: true,
        });
    };

    const logout = () => {
        Cookies.remove('jwt');
        setUser({
            token: '',
            auth: false,
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
