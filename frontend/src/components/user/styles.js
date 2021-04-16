
import { makeStyles } from '@material-ui/core/styles';

const mingColor = '#387780';
const dartmouthGreenColor = '#2D7638';
const emeraldGreenColor = '#62C370';
const emeraldGreenColorOpacity = "rgba(98,195,112,0.6)";
const paperBackGroundWhite = "rgba(255,255,255,0.8)";

export const useStyles = makeStyles(theme => {
    return {
        paper: {
            backgroundColor: `${paperBackGroundWhite}`,
            margin: theme.spacing(4, 0),
            display: 'flex',
            color: `${mingColor}`,
            flexDirection: 'column',
            alignItems: 'center',
            border: `1px solid ${emeraldGreenColorOpacity}`,
            boxShadow: ` 1px 1px 4px ${emeraldGreenColorOpacity}`,
            borderRadius: '2rem',
            padding: '1.5rem 2.5rem',

        },

        avatar: {
            margin: theme.spacing(3),
            backgroundColor: emeraldGreenColor,
            fontSize: 50,
        },
        animateAvatar:{
            margin: theme.spacing(3),
            backgroundColor: emeraldGreenColor,
            fontSize: 50,
            animation: `$colorChange 3000ms ${theme.transitions.easing.easeInOut}`,
            animationIterationCount: 'infinite'
        },
        "@keyframes colorChange": {
            "0%": {
                backgroundColor: emeraldGreenColor,
                transform:"rotateY(0deg)"
            },

            "50%": {
                backgroundColor: mingColor,
            },
            "100%": {
                backgroundColor: emeraldGreenColor,
                transform: "rotateY(360deg)"
            }
        },
        form: {
            marginTop: theme.spacing(4),
            width: '100%',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: emeraldGreenColor,
            color: 'white',
            padding: '50 50',
        },
        link: {
            color: mingColor,
            textDecoration: 'none !important',
        },
        error: {
            color: 'red',
        },
        textField: {
            backgroundColor: "#fff",
            '& label.Mui-focused': {
                color: mingColor,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: dartmouthGreenColor,
            },
            '&$checked': {
                color: '#3D70B2',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: dartmouthGreenColor,
                },
                '&:hover fieldset': {
                    borderColor: emeraldGreenColor,
                },
                '&.Mui-focused fieldset': {
                    borderColor: mingColor,
                }
            }
        },

    };
});