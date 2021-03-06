import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";


import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import * as routes from '../routing/routes'
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import { orangeColor, textGrey} from "../pageStyle/colors";
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
const useStyles = makeStyles((theme) => ({
    listItem:{
        textDecoration: 'none',
        color: `${textGrey}`,
        '&:visited': {
            color: `${textGrey}`
        },
        '&:hover ':{
            '& > div> div:first-child ':{
                color: `${orangeColor}`
            }
        }
    },
    itemIcon:{
        color: `${textGrey}`

    }
}));
const ListItemLink = ({icon, path, text}) => {
    const classes = useStyles();
    return (
        <Link to={path} className={classes.listItem}>
        <ListItem button key={text}>
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
        </ListItem>
        </Link>
    )
};

const LoggedMenu = () => {
    return (
        <List>
            <ListItemLink icon={ <AccountCircleIcon/>} path={routes.ME} text="Me"/>
            <ListItemLink icon={ <LibraryMusicIcon/>} path={routes.SONGS} text="Songs"/>
        </List>
    )
};
const LogoutMenu = () => {
    return (
        <List>
            <ListItemLink icon={ <HomeIcon/>} path={routes.HOME} text="Home" />
            <ListItemLink icon={ <InfoIcon/>} path={routes.ABOUT} text="About"/>
            <ListItemLink icon={ <ContactSupportIcon/>} path={routes.CONTACT} text="Contact"/>
        </List>
    )
};

export {LoggedMenu, LogoutMenu}
