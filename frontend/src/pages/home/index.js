import React from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStyles} from "../styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
export const Home = () =>{
    const classes = useStyles();
    return(

        <Container component='main' maxWidth='xl'>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Home</Typography>
                        <Typography variant="body1" paragraph="true" display="block" align="left">
                            Litwo! Ojczyzno moja! ty jesteś jak zdrowie:
                            Ile cię trzeba cenić, ten tylko się dowie,
                            Kto cię stracił. Dziś piękność twą w całej ozdobie
                            Widzę i opisuję, bo tęsknię po tobie. </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper className={classes.paper} style={{height: "2000px"}}>
                        <Typography variant="h5">Home2</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}