import React, {useContext} from 'react'
import {Redirect, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import {UserContext} from "../components/user/userProvider";


export const AuthRoute = ({children, ...rest}) => {
    const {user} = useContext(UserContext)
    const token = Cookies.get('jwt');

    if (!token || !user.auth) return <Redirect to={`/login`}/>;
    
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;

    if (decoded.exp <= now) {
        Cookies.remove('jwt');
        return <Redirect to={`/login`}/>;
    }
    return <Route {...rest}>{children}</Route>
}