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
    const [responsable, setResponsable] = React.useState();
    const [iteracion, setIteracion] = React.useState();
    const [fase, setFase] = React.useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url + "/" + id)
            .then(res => {
                console.log(res.data);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id, url, setProyecto]);

    const onConfirm = (data) => {
        axios.put(process.env.REACT_APP_URL_PROYECTOS + url + "/" + id, data)
            .then((result) => {
                updateElems();
                history.push(url + "/" + id)
                setProyecto(data);
            })
            .catch(error => {
                // TODO.
            console.log(error.response);
        });
        updateElems();
      };

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <BotonVolver url = {url}/>
                <Details type = {type} isTarea = {isTarea} initValuesSetter = {{fase : setFase, iteracion : setIteracion, responsable : setResponsable}} 
                esProyecto = {isProyecto} mostrar={Boolean(elemento)} {...elemento}/>
                <AccionesProyecto mostrar = {true} verFases = {isProyecto} elem = {elemento}
                updateElems = {updateElems} 
                isTarea = {isTarea} 
                isIteracion = {isIteracion}
                isFase = {isFase}/>
                {isTarea && <Tickets tickets = {elemento.tickets} mostrar = {Boolean(elemento)}></Tickets>}
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <EditarElemento onConfirm = {onConfirm} titulo = "Modificar detalles" 
                    initv = {{fase : fase, iteracion : iteracion, responsable : responsable}}
                    url = {url + "/" + id} 
                    //updateElems = {updateElems}  
                    isProyecto = {isProyecto}
                    isTarea = {isTarea} 
                    isIteracion = {isIteracion}
                    isFase = {isFase}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
