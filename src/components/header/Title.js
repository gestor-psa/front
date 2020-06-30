import {useLocation} from "react-router";
import {content} from 'sections/Content'
import {Hidden, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";


const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.secondary.contrastText,
        fontWeight: 600,
        fontSize: 28
    }
}));

export default () => {
    let location = useLocation();
    const classes = useStyles();
    const title = content.find(section =>
        location.pathname === section.route ||
        location.pathname.startsWith(section.route + '/'));

    return (
        <Hidden mdUp>
            <Typography variant="h5" className={classes.title}>
                {(title && title.label) || 'Not found'}
            </Typography>
        </Hidden>
    )
}