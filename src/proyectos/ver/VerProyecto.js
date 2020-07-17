import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ver/ProyectoDetalles";
import { useParams, useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/Acciones";
//import axios from "axios";




export default () => {
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const [proyecto, setProyecto] = useState();

    useEffect(() => {
        /*axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ id)
            .then(res => {
                console.log(res);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })*/
            setProyecto({nombre: "Gestor PSA", estado:"Activo", fechaInicio: "01/01/2020", fechaFin:"",
            descripcion: "Gestor PSA para gestionar proyectos en forma modular Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
        })
    }, [id]);

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <ProyectoDetails mostrar={Boolean(proyecto)} {...proyecto}/>
                <AccionesProyecto mostrar = {true}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>

            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
