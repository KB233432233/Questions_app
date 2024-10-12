import { Typography, IconButton, makeStyles, Box } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ExpandLess';
import ArrowDownward from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    arrowUp: {
        padding: 5,
        color: theme.palette.success.main
    },
    arrowDown: {
        padding: 5,
        color: theme.palette.danger.main
    },
}));

export default function Vote({votesTotal, vote}){
    const classes = useStyles()
    return (
        <Box display='flex' flexDirection='column'>
            <IconButton onClick={() => vote(true)} className={classes.arrowUp}>
                <ArrowUpward />
            </IconButton>
            <Typography variant="p" align="center">{votesTotal || 0}</Typography>
            <IconButton onClick={() => vote(false)} className={classes.arrowDown}>
                <ArrowDownward />
            </IconButton>
        </Box>
    );
}
