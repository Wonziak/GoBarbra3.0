import React, {useContext} from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStylesBasic} from "../styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {HitList} from "../../components/song/hitList";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/user";
export const Home = () =>{
    const classes = useStylesBasic();
    const {auth} = useContext(UserContext)
    console.log(auth)
    return(
        <Container component='main' maxWidth='xl'>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" paragraph="true">Make Your own customized Barbra Streisand song!</Typography>
                        <Typography variant="body1" paragraph="true" display="block" align="left">
                            This page allows you to customize your own Barbra Streisand song.
                         </Typography>
                        <Typography variant="body1" paragraph="true" display="block" align="left">
                            Account is required.
                        </Typography>
                        <Button
                            component={ Link } to={auth?"/new/song":"/login"}
                            variant='contained'
                            className={classes.submit}
                        >
                            Add new song
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper} >
                        <Typography variant="h5" paragraph="true">Hit List</Typography>
                        <HitList/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}