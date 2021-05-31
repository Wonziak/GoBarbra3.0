
import { makeStyles } from '@material-ui/core/styles';
import {paperBackGroundGrey, borderGrey, textGrey, orangeColor, navBarGrey} from '../pageStyle/colors'

export const useStylesBasic = makeStyles(theme => {
    return {
        paper: {
            backgroundColor: `${paperBackGroundGrey}`,
            margin: theme.spacing(4,0,0),
            display: 'flex',
            color: `${textGrey}`,
            flexDirection: 'column',
            alignItems: 'center',
            border: `1px solid ${borderGrey}`,
            boxShadow: ` 1px 1px 4px ${borderGrey}`,
            borderRadius: '2rem',
            padding: '1.5rem 2.5rem',

        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: orangeColor,
            color: 'white',
            padding: '50 50',
            '&:hover':{
                backgroundColor: navBarGrey
            }
        },
        form: {
            marginTop: theme.spacing(4),
            width: '100%',
        },
        error: {
            color: 'red',
        },
        textField: {
            backgroundColor: "#fff",
            '& label.Mui-focused': {
                color: textGrey,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: orangeColor,
            },
            '&$checked': {
                color: '#3D70B2',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: orangeColor,
                },
                '&:hover fieldset': {
                    borderColor: navBarGrey,
                },
                '&.Mui-focused fieldset': {
                    borderColor: navBarGrey,
                }
            }
        }
    }


});