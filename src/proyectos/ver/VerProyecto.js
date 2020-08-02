import React, { useEffect } from 'react';
import ProyectoDetails from "proyectos/ver/PantallaDetallesElemento";
import { useParams, useRouteMatch, useHistory } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import EditarProyecto from 'proyectos/PantallaEdicionElemento';
import axios from "axios";
import BotonVolver from 'proyectos/common/BotonVolver'
import Tickets from "proyectos/ver/Tickets"

export default ({setProyecto, proyecto, url, isFase, isIteracion, isTarea}) => {
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const history = useHistory();
    const isProyecto = !(isFase || isIteracion || isTarea);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url + "/" + id)
            .then(res => {
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id, url, setProyecto]);

    const onConfirm = (data) => {
        axios.put(process.env.REACT_APP_URL_PROYECTOS + url, data)
            .then((result) => {
                history.push(`/proyectos/`+ id)
                setProyecto(data);
                console.log(result);
            })
            .catch(error => {
                // TODO.
            console.log(error.response);
        });
      };

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <BotonVolver url = {url}/>
                <ProyectoDetails esProyecto = {true} mostrar={Boolean(proyecto)} {...proyecto}/>
                {isTarea && <Tickets tickets = {proyecto.tickets} mostrar = {Boolean(proyecto)}></Tickets>}
                <AccionesProyecto mostrar = {true} verFases = {isProyecto} verTareas = {isProyecto || isIteracion} verIteraciones = {isFase && !isIteracion}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarProyecto onConfirm = {onConfirm} titulo = "Modificar detalles" url = {url + "/" + id} />
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
