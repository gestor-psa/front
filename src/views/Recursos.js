import React from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import Empleados from "recursos/empleados/Empleados";
import Empleado from "recursos/empleados/Empleado";
import CrearEmpleado from "recursos/empleados/CrearEmpleado";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";




export default () => {
    const { path } = useRouteMatch() || {};
    return (
        <ContentWrapper>
            <AnimatedSwitch>
                <AnimatedRoute exact path={path}>
                    <Empleados />
                </AnimatedRoute>
                <AnimatedRoute path={`${path}/creacion`}>
                    <CrearEmpleado />
                </AnimatedRoute>
                <AnimatedRoute path={`${path}/:id(\\d+)`}>
                    <Empleado />
                </AnimatedRoute>
            </AnimatedSwitch>
        </ContentWrapper>
    )
}
