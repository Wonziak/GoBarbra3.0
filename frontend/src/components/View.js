import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {Link} from "react-router-dom";
import {useStyles} from "./viewStyles";


export const View = ({children}) =>{

    const classes = useStyles();
    return(
        <Card className={classes.wallpaper}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                        <Typography variant="h5" className={classes.title}>
                            <Link to="/" className={classes.titleLink}>
                            GO BARBRA V3
                            </Link>
                        </Typography>

                    <Link to="/login" className={classes.titleLink}>
                    <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
                {children}
        </Card>
    )
}