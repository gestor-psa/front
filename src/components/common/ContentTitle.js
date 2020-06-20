import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Hidden} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary[theme.palette.contrastType],
        margin: theme.spacing(2)
    }
}));

export default ({title}) => {
    const classes = useStyles();

    return (
        <Hidden mdUp>
            <Typography variant="h5" className={classes.title}>
                {title}
            </Typography>
        </Hidden>
    )
}
