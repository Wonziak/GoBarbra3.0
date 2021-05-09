import React, {useEffect, useState} from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import API from '../../services/api';
import Cookies from "js-cookie";
import {useStylesBasic} from "../styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import * as routes from "../../routing/routes";


export const Me = () =>{
    const classes = useStylesBasic();
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
        <Container component='main' maxWidth='xl'>
            <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography variant="h5">
                            {user.username&&<p>{user.username}</p>}
                            {user.email&&<p>{user.email}</p>}
                        </Typography>
                        <Link to={routes.NEW_SONG} >
                            <Button
                                variant='contained'
                                className={classes.submit}>
                                Add new song
                            </Button>
                        </Link>
                    </Paper>
        </Container>

    )
}