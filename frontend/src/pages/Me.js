import React, {useEffect, useState} from "react";
import { Button } from '@material-ui/core';
import API from '../services/api';
import Cookies from "js-cookie";
export const Me = () =>{

    const [user, setUser] = useState({
        name: '',
        email: ''
    })
    useEffect(()=>{
        let jwt = Cookies.get('jwt');
        API.get('/user/me', {
            headers:{'Authorization': `Bearer ${jwt}`}
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(errInfo => {
                console.log(errInfo)
            })

    },[])

    return(
        <>
            <h1>Me</h1>
            {user.username&&<span>{user.username}</span>}
            {user.email&&<span>{user.email}</span>}
        </>
    )
}