import React from 'react';
import {useRouteMatch} from "react-router";
import Empleado from "recursos/empleados/Empleado";
import CrearEmpleado from "recursos/empleados/crear/CrearEmpleado";
import MenuEmpleados from "recursos/empleados/MenuEmpleados";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /empleados
export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <MenuEmpleados/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/creacion`}>
                <CrearEmpleado/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Empleado/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
