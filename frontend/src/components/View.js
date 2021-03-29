import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import background from "../img/notes-wallpaper.jpg";
const emeraldGreenColor = '#62C370';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    toolBar: {
        background: emeraldGreenColor,
    },
    wallpaper:{
        height: '100vh',
        backgroundImage: `url(${background})`,
        background: "#fff",
        backgroundSize: "cover"

    }
}));

export const View = ({childen}) =>{

    const classes = useStyles();
    return(
        <Card className={classes.wallpaper}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        GO BARBRA V3
                    </Typography>
                    <Button color="inherit" href="/login" >Login</Button>
                </Toolbar>
            </AppBar>
                {childen}
        </Card>
    )
}