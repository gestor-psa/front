import React, { Fragment } from 'react';
import {useRouteMatch} from "react-router";
import AnimatedSwitch from 'components/common/AnimatedSwitch';
import AnimatedRoute from 'components/common/AnimatedRoute';
import ListadoProyectos from './ListadoProyectos';
import AgregarProyecto from './AgregarProyecto';
import CrearProyecto from './CrearProyecto';
import OverviewProyecto from './CrearProyecto';


export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Fragment>
                    <AgregarProyecto />
                    <ListadoProyectos />
                </Fragment>
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