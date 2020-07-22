import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ver/ProyectoDetalles";
import { useParams, useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import EditarProyecto from 'proyectos/CrearProyecto';
import axios from "axios";
import VistaListado from 'proyectos/VistaListado';
import { Typography } from '@material-ui/core';

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
            //setProyecto({nombre: "Gestor PSA", estado:"Activo", fechaInicio: "01/01/2020", fechaFin:"",
            //descripcion: "Gestor PSA para gestionar proyectos en forma modular Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
    }, [id]);

    const mapFases = (fase) =>(fase.nombre);
    //todo boton volver en fases y tareas
    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <ProyectoDetails mostrar={Boolean(proyecto)} {...proyecto}/>
                <AccionesProyecto mostrar = {true}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarProyecto titulo = "Modificar Proyecto" proyecto = {proyecto} />
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/fases`}>
                <Typography> FASES </Typography>
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"fases"}></VistaListado>) || (<Typography>No hay fases</Typography>)}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/tareas`}> 
             <Typography>Tareas</Typography>
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"tareas"}></VistaListado>) || (<Typography>No hay tareas</Typography>)}
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
