import {makeStyles} from "@material-ui/core/styles";
import background from "../img/notes-wallpaper.jpg";
const emeraldGreenColor = '#62c370';
const emeraldGreenColorOpacity = "rgba(98,195,112,0.5)";
const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: '100vh',
        backgroundImage: `url(${background})`,
        background: "#fff",
        backgroundSize: "cover"

    },
    menuButton: {
        marginRight: theme.spacing(2),
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
        background: emeraldGreenColor,
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
        backgroundColor: `${emeraldGreenColorOpacity}`
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        backgroundColor: "rgba(255,255,255,0.7)",
        width: drawerWidth,
        borderRight: `1px solid ${emeraldGreenColorOpacity}`,
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
        borderRight: `1px solid ${emeraldGreenColorOpacity}`,
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