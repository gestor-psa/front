import React, {useEffect, useState, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {useRouteMatch} from "react-router";
import AnimatedSwitch from 'components/common/AnimatedSwitch';
import AnimatedRoute from 'components/common/AnimatedRoute';
import ListadoProyectos from './ListadoProyectos';
import AgregarProyecto from './AgregarProyecto';
import CrearProyecto from './CrearProyecto';
import OverviewProyecto from './CrearProyecto';


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
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Fragment>
                    <AgregarProyecto />
                    <ListadoProyectos />
                </Fragment>
                {/* <Paper className={classes.paper}> */}
                    
                {/* </Paper> */}
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/crear`}>
                <CrearProyecto />
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <OverviewProyecto />
            </AnimatedRoute>
        </AnimatedSwitch>

    )
}