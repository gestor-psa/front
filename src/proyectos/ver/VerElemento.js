import React, { useEffect } from 'react';
import Details from "proyectos/ver/VistaDetallesElemento";
import { useParams, useRouteMatch, useHistory } from "react-router";
import AnimatedSwitch from "proyectos/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import EditarElemento from 'proyectos/VistaEdicionElemento';
import axios from "axios";
import BotonVolver from 'proyectos/common/BotonVolver'
import Tickets from "proyectos/ver/Tickets"

export default ({setProyecto, elemento, url, isFase, isIteracion, isTarea, updateElems, type}) => {
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
        axios.put(process.env.REACT_APP_URL_PROYECTOS + url + "/" + id, data)
            .then((result) => {
                history.push(url + "/" + id)
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
                <Details type = {type} isTarea = {isTarea} esProyecto = {isProyecto} mostrar={Boolean(elemento)} {...elemento}/>
                <AccionesProyecto mostrar = {true} verFases = {isProyecto} elem = {elemento}
                updateElems = {updateElems}  
                isTarea = {isTarea} 
                isIteracion = {isIteracion}
                isFase = {isFase}/>
                {isTarea && <Tickets tickets = {elemento.tickets} mostrar = {Boolean(elemento)}></Tickets>}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarElemento onConfirm = {onConfirm} titulo = "Modificar detalles" 
                    url = {url + "/" + id} 
                    isProyecto = {isProyecto}
                    isTarea = {isTarea} 
                    isIteracion = {isIteracion}
                    isFase = {isFase}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
