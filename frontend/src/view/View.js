import React, { useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {useStyles} from "./styles";
import * as routes from '../routing/routes'
import {useTheme} from "@material-ui/core";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from "@material-ui/core/CssBaseline";
import logoImage from '../img/Barbra-logo.png';
import {LoggedMenu, LogoutMenu} from './menu'
import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom";
export const View = ({children}) =>{

    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                <Toolbar className={classes.toolBar}>
                    <IconButton onClick={handleDrawerOpen} edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                                color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {
                        !open&&
                        <Typography variant="h5" className={classes.title}>
                            <Link to={routes.HOME} className={classes.titleLink}>
                                GO BARBRA V3
                            </Link>
                        </Typography>
                    }

                    {Cookies.get('jwt2')?
                        <Button color="inherit" onClick={()=>{
                            Cookies.remove("jwt2");
                            history.push("/");
                        }}>Logout</Button>:
                        <Link to={routes.LOGIN} className={clsx(classes.titleLink,classes.loginButton)}>
                            <Button color="inherit" >Login</Button>
                        </Link>

                    }
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                        <Link to={routes.HOME}>
                            <img src={logoImage} className={classes.logo} alt=""/>
                        </Link>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <LogoutMenu/>
                {Cookies.get('jwt2')&&<>
                    <Divider />
                    <LoggedMenu/>
                    </>
                }


            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>

        </div>
    )
}