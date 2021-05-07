import React from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStyles} from "../styles";
import Typography from "@material-ui/core/Typography";
export const About = () =>{
    const classes = useStyles();
    return(
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h5">About</Typography>
            </div>
        </Container>
    )
}