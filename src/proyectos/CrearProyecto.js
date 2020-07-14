import React, {useEffect, useState, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {useRouteMatch} from "react-router";
// import OverviewProyecto from './CrearProyecto';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
        }
    }
}));


export default () => {
    const classes = useStyles();
    const {path} = useRouteMatch() || {};

    return (
        <Fragment>
            <div>
                Hola
            </div>
        </Fragment>
    )
}