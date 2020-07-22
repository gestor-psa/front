import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ver/ProyectoDetalles";
import { useParams, useRouteMatch, useHistory } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import EditarProyecto from 'proyectos/CrearProyecto';
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
                console.log(res);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
            //setProyecto({nombre: "Gestor PSA", estado:"Activo", fechaInicio: "01/01/2020", fechaFin:"",
            //descripcion: "Gestor PSA para gestionar proyectos en forma modular Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
    }, [id]);

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
                <EditarProyecto titulo = "Modificar Proyecto" proyecto = {proyecto} />
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/fases`}> 
                {volverB}
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"fases"}></VistaListado>) || error}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/tareas`}> 
                {volverB}
                {(proyecto && <VistaListado url = {'/proyectos/'+id+"tareas"}></VistaListado>) || error}
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
