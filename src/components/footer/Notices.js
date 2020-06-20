import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.lighter(70),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(4)
        }
    },
    item: {
        [theme.breakpoints.only('xs')]: {
            display: 'flex',
            width: '100%'
        }
    },
    itemContent: {
        [theme.breakpoints.only('xs')]: {
            margin: 'auto'
        },
    },
    text: {
        display: 'inline'
    },
    copyright: {
        [theme.breakpoints.only('sm')]: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
        }
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item className={`${classes.item} ${classes.copyright}`}>
                <div className={classes.itemContent}>
                    <Typography variant='h6' className={classes.text}>Copyright © {new Date().getFullYear()}</Typography>
                </div>
            </Grid>
        </Grid>
    )
}