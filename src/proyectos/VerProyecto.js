import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ProyectoDetalles";
import { useParams, useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import axios from "axios";




export default () => {
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const [proyecto, setProyecto] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ id)
            .then(res => {
                console.log(res);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id]);

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <ProyectoDetails proyecto = {proyecto} />
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>

            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
