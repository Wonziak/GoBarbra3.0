
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
            margin: theme.spacing(4,0,0),
            display: 'flex',
            color: `${mingColor}`,
            flexDirection: 'column',
            alignItems: 'center',
            border: `1px solid ${emeraldGreenColorOpacity}`,
            boxShadow: ` 1px 1px 4px ${emeraldGreenColorOpacity}`,
            borderRadius: '2rem',
            padding: '1.5rem 2.5rem',

        },
    }
});