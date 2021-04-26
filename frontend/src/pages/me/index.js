import React, {useEffect, useState} from "react";
import {Button, Container, createMuiTheme, CssBaseline, makeStyles} from '@material-ui/core';
import API from '../../services/api';
import Cookies from "js-cookie";
import {useStyles} from "../styles";
import Typography from "@material-ui/core/Typography";
import AudioPlayer from 'material-ui-audio-player';
import {ThemeProvider} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import * as routes from "../../routing/routes";

const muiTheme = createMuiTheme({});
const useStyless = makeStyles((theme) => {
    return {
        root: {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        loopIcon: {
            color: '#3f51b5',
            '&.selected': {
                color: '#0921a9',
            },
            '&:hover': {
                color: '#7986cb',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        playIcon: {
            color: '#f50057',
            '&:hover': {
                color: '#ff4081',
            },
        },
        replayIcon: {
            color: '#e6e600',
        },
        pauseIcon: {
            color: '#0099ff',
        },
        volumeIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
        },
        volumeSlider: {
            color: 'black',
        },
        progressTime: {
            color: 'rgba(0, 0, 0, 0.54)',
        },
        mainSlider: {
            color: '#3f51b5',
            '& .MuiSlider-rail': {
                color: '#7986cb',
            },
            '& .MuiSlider-track': {
                color: '#3f51b5',
            },
            '& .MuiSlider-thumb': {
                color: '#303f9f',
            },
        },
    };
});

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
        <Container component='main' maxWidth='xl'>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
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
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">
                            <p>Last song</p>
                            <p></p>
                        </Typography>
                        <ThemeProvider theme={muiTheme}>
                            <AudioPlayer
                                width="100%"
                                useStyles={useStyless}
                                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                                loop={true}
                                download={true}
                                preload="auto"
                            />
                        </ThemeProvider>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}