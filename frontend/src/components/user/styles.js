
import { makeStyles } from '@material-ui/core/styles';

const mingColor = '#387780';
const dartmouthGreenColor = '#2D7638';
const emeraldGreenColor = '#62C370';


export const useStyles = makeStyles(theme => {
    return {
        paper: {
            backgroundColor: "#fff",
            margin: theme.spacing(4, 0),
            display: 'flex',
            color: '#387780',
            flexDirection: 'column',
            alignItems: 'center',
            border: `1px solid ${emeraldGreenColor}`,
            borderRadius: '2rem',
            padding: '1.5rem 2.5rem',

        },
        avatar: {
            margin: theme.spacing(3),
            backgroundColor: emeraldGreenColor,
            fontSize: 50,
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
        checkBox: {
            color: `${emeraldGreenColor} !important`,
        },
        error: {
            color: 'red',
        },
        textField: {
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
        }
    };
});