import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {useRouteMatch} from "react-router";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles((theme) => ({
    cta: {
        marginTop: theme.spacing(3),
    }
}));


export default () => {
    const classes = useStyles();
    const {path} = useRouteMatch() || {};

    return (
        <Button
        color='secondary'
        variant='contained'
        to={`${path}/crear`}
        component={Link}
        className={classes.cta}
        >
            Nuevo proyecto
        </Button>
    )
}