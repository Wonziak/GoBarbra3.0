import React, {useEffect, useState} from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import API from '../services/api';
import Cookies from "js-cookie";
import {useStyles} from "./styles";
import Typography from "@material-ui/core/Typography";
export const Me = () =>{
    const classes = useStyles();
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
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h5">
                    {user.username&&<p>{user.username}</p>}
                    {user.email&&<p>{user.email}</p>}
                </Typography>
            </div>
        </Container>

    )
}