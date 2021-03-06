import {useStylesBasic} from "../styles";
import {Button, Container, CssBaseline} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

export const ErrorPage = () =>{
    const classes = useStylesBasic();
    return(
        <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h4" paragraph="true" >404</Typography>
                <Typography variant="h4" >Page not found</Typography>
                <Button
                    component={ Link } to="/"
                    type='submit'
                    variant='contained'
                    className={classes.submit}
                >
                    Go back home
                </Button>
            </div>
        </Container>
    );
}