import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ver/ProyectoDetalles";
import { useParams, useRouteMatch, useHistory } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import EditarProyecto from 'proyectos/EditarProyecto';
import axios from "axios";
import VistaListado from 'proyectos/VistaListado';
import { Typography } from '@material-ui/core';
import BotonVolver from "proyectos/common/BotonVolver";
import Proyecto from 'proyectos/Proyecto'
import VistaFases from 'proyectos/ver/VistaFases'

export default () => {
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const [proyecto, setProyecto] = useState();
    const history = useHistory();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ id)
            .then(res => {
                console.log(res.data);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id]);

    const onConfirm = (data) => {
        axios.put(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ id, data)
            .then((result) => {
                history.push(`/proyectos/`+ id)
                console.log(result);
            })
            .catch(error => {
                // TODO.
            console.log(error.response);
        });
      };

    console.log(path)
    const error = <Typography color = 'error'>Error al cargar proyecto</Typography>;
    
    const mapTareas = (tarea) => (
        <Proyecto proyecto={tarea} key={tarea.id}/>
    )

    const mapFases = (fase) => (
        <Proyecto proyecto={fase} key={fase.id}/>
      )

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <ProyectoDetails mostrar={Boolean(proyecto)} {...proyecto}/>
                <AccionesProyecto mostrar = {true}/>
                <BotonVolver></BotonVolver>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarProyecto onConfirm = {onConfirm} titulo = "Modificar Proyecto" proyecto = {proyecto} />
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/tareas`}> 
                <BotonVolver></BotonVolver>
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"/tareas"} mapf = {mapTareas}></VistaListado>) || error}
            </AnimatedRoute>
            <AnimatedRoute exact path={ `${path}/fases`}>
                <BotonVolver></BotonVolver>
                {<VistaListado url = {`${path}/fases`} mapf = {mapFases}></VistaListado>}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}`+"/fases/crear"}>
                <BotonVolver></BotonVolver>
                crear fase
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}`+"/fases/:id(\\d+)"}>
                <BotonVolver></BotonVolver>
                verFase
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
