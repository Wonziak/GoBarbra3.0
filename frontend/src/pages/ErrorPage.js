import {useStyles} from "./styles";
import {Button, Container, CssBaseline} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";

export const ErrorPage = () =>{
    const classes = useStyles();
    return(
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h5">404</Typography>
            </div>
        </Container>
    );
}