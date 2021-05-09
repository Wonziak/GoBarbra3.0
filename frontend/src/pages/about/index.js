import React from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStylesBasic} from "../styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import * as routes from "../../routing/routes";
import materialUI from "../../img/material.png";
import react from "../../img/react.png";
import Grid from "@material-ui/core/Grid";
export const About = () =>{
    const classes = useStylesBasic();
    return(
        <Container component='main' maxWidth='xl'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h5" paragraph="true">About</Typography>
                <Typography variant="h5" paragraph="true">Page was written as a project for studies.</Typography>
                <Typography variant="h5" paragraph="true">Technologies such as react and material were used for this project</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Link to={"https://pl.reactjs.org/"} target="_blank">
                            <img src={react} alt="" />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link to={"https://material-ui.com/"} target="_blank" >
                            <img src={materialUI} alt=""/>
                        </Link>
                    </Grid>
                </Grid>


            </div>
        </Container>
    )
}