
import { makeStyles } from '@material-ui/core/styles';
import {orangeColorBrighter, orangeColor, green} from "../../pageStyle/colors";

export const useStyles = makeStyles(theme => {
    return {
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:hover':{
                backgroundColor: orangeColorBrighter
            }
        },
        tableHeader:{
            backgroundColor: orangeColor,
        },
        tablePagination:{
            alignSelf: "end"
        },
        icon:{
            '&:hover':{
                color: green
            }
        }
    }});
export const audioPlayerStyle = makeStyles(theme => {
        return {
            root: {

                margin: "1px",
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
            },
            playIcon: {
                color: orangeColor,
                '&:hover': {
                    color: green,
                },
            },
            pauseIcon: {
                color: '#303f9f',
            },
            volumeIcon: {
                color: orangeColor,
            },
            volumeSlider: {
                color: 'black',
            },
            progressTime: {
                color: 'rgba(0, 0, 0, 0.54)',
            },
            mainSlider: {
                color: orangeColor,
                '& .MuiSlider-rail': {
                    color: '#303f9f',
                },
                '& .MuiSlider-track': {
                    color: orangeColor,
                },
                '& .MuiSlider-thumb': {
                    color: '#303f9f',
                },
            },
        };
    }
)