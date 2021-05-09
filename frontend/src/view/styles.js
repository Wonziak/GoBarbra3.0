import {makeStyles} from "@material-ui/core/styles";
import background from "../img/notes-wallpaper.jpg";
import {navBarGrey, borderGrey, orangeColor,} from '../pageStyle/colors'
const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({

    bgImage:{
        position: "fixed",
        backgroundImage: ` url(${background})`,
        //filter: 'sepia(10%) invert(100%)',
        height: "100%",
        width: '100%',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        background: "#fff",
    },
    root: {
        position: "absolute",
        display: "flex",
        height: '100vh',
        width: '100vw',
        top: "0%",
        left: "0%",
        overflow:"auto",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        '&:hover':{
            color: orangeColor
        }
    },
    hide: {
        display: 'none',
    },
    title: {
        width: "100%",
        textAlign: "start",
        flexGrow: 1,
    },
    loginButton: {
        textAlign: "end",
        flexGrow: 1,
        '&:hover > span > a':{
            color: orangeColor
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolBar: {
        background: navBarGrey,
    },
    logo:{
        display: "block",
        marginRight: "20px",

        height: "59px",
        maxWidth: "auto",

    },
    titleLink: {
        textDecoration: 'none',
        color: "#fff",
        '&:visited': {
            color: "#fff"
        },
    },

    divider:{
        backgroundColor: `${borderGrey}`
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        backgroundColor: "rgba(255,255,255,0.7)",
        width: drawerWidth,
        borderRight: `1px solid ${borderGrey}`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        borderRight: `1px solid ${borderGrey}`,
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));