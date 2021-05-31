
import { makeStyles } from '@material-ui/core/styles';
import {textGrey, navBarGrey} from '../../pageStyle/colors'



export const useStyles = makeStyles(theme => {
    return {
        avatar: {
            margin: theme.spacing(3),
            backgroundColor: navBarGrey,
            fontSize: 50,
        },
        animateAvatar:{
            margin: theme.spacing(3),
            backgroundColor: navBarGrey,
            fontSize: 50,
            animation: `$colorChange 3000ms ${theme.transitions.easing.easeInOut}`,
            animationIterationCount: 'infinite'
        },
        "@keyframes colorChange": {
            "0%": {
                backgroundColor: navBarGrey,
                transform:"rotateY(0deg)"
            },

            "50%": {
                backgroundColor: textGrey,
            },
            "100%": {
                backgroundColor: navBarGrey,
                transform: "rotateY(360deg)"
            }
        },
        link: {
            color: textGrey,
            textDecoration: 'none !important',
        },
    };
});