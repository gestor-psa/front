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
import ColoredButton from "soporte/common/ColoredButton";

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

    const volver = () => (history.push('/proyectos/'+ id));
    const volverB =  <ColoredButton onClick={volver} variant='outlined'color='warning'> Volver</ColoredButton>;
    const error = <Typography color = 'error'>Error al cargar proyecto</Typography>;
    //const mapFases = (fase) =>(fase.nombre);
    
    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <ProyectoDetails mostrar={Boolean(proyecto)} {...proyecto}/>
                <AccionesProyecto mostrar = {true}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarProyecto onConfirm = {onConfirm} titulo = "Modificar Proyecto" proyecto = {proyecto} />
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/fases`}> 
                {volverB}
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"/fases"}></VistaListado>) || error}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/tareas`}> 
                {volverB}
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"/tareas"}></VistaListado>) || error}
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
