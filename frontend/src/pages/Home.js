import React from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStyles} from "./styles";
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
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper className={classes.paper} style={{height: "500px"}}>
                        <Typography variant="h5">Home2</Typography>
                    </Paper>
                </Grid>
            </Grid>


        </Container>
    )
}