import React from "react";
import {Container, CssBaseline} from '@material-ui/core';
import {useStylesBasic} from "../styles";
import Typography from "@material-ui/core/Typography";

import materialUI from "../../img/material.png";
import react from "../../img/react.png";
import Grid from "@material-ui/core/Grid";
export const About = () =>{
    const classes = useStylesBasic();
    return(
        <Container component='main' maxWidth='md'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h4" paragraph="true">About</Typography>
                <Typography variant="h5" paragraph="true">Page was written as a project for studies.</Typography>
                <Typography variant="h5" paragraph="true">Technologies such as react and material were used for this project</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                            <img src={react} alt="" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                            <img src={materialUI} alt=""/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}