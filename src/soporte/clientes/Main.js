import React from 'react';
import {useRouteMatch} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import Clientes from "soporte/clientes/listar/Clientes";
import CrearCliente from "soporte/clientes/crear/CrearCliente";
import Cliente from "soporte/clientes/Cliente";


export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Clientes/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/creacion`}>
                <CrearCliente/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Cliente/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
