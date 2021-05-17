import React, {useEffect, useState} from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import API from '../../services/api';
import Cookies from "js-cookie";
import {useStylesBasic} from "../styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Link, useHistory} from "react-router-dom";
import * as routes from "../../routing/routes";


export const Me = () => {
    const classes = useStylesBasic();
    const history = useHistory()
    const [user, setUser] = useState({
        username: '',
        email: ''
    })

    useEffect(() => {
        let jwt = Cookies.get('jwt');
        API.get('/user/me', {
            headers: {'Authorization': `Bearer ${jwt}`}
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(errInfo => {
                console.log(errInfo)
            })

    }, [])


    return (
        <Container component='main' maxWidth='sm'>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Typography variant="h4" paragraph="true">About me</Typography>
                {user.username &&
                <>
                    <Typography variant="h5" paragraph="true"> UserName</Typography>
                    <Typography variant="body1" paragraph="true" display="block" align="center">
                        {user.username}
                    </Typography>
                </>}
                {user.email &&
                <>
                    <Typography variant="h5" paragraph="true"> Email</Typography>
                    <Typography variant="body1" paragraph="true" display="block" align="center">
                        {user.email}
                    </Typography>
                </>}
                {user.songs_count &&
                <>
                    <Typography variant="h5" paragraph="true"> Songs count</Typography>
                    <Typography variant="body1" paragraph="true" display="block" align="center">
                        {user.songs_count}
                    </Typography>
                </>}
                <Link to={routes.NEW_SONG}>
                    <Button
                        variant='contained'
                        className={classes.submit}>
                        Add new song
                    </Button>
                </Link>
                <Link to={routes.UPDATE_USER}>
                    <Button
                        variant='contained'
                        className={classes.submit}>
                        Update data
                    </Button>
                </Link>
            </Paper>
        </Container>

    )
}