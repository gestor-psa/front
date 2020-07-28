import React, { useEffect, useState } from 'react';
import ProyectoDetails from "proyectos/ver/PantallaDetallesElemento";
import { useParams } from "react-router";
import AccionesProyecto from "proyectos/ver/AccionesVer";
import axios from "axios";
import { Grid } from '@material-ui/core';

export default ({proyectoId, setFaseProyecto}) => {
    const { id } = useParams();
    const [fase, setFase] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ proyectoId + "/fases/"+ id)
            .then(res => {
                setFase(res.data);
                setFaseProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [ id, proyectoId, setFaseProyecto]);

    return (<Grid>
            <ProyectoDetails mostrar={Boolean(fase)} {...fase} />
            <AccionesProyecto mostrar = {true} verIteraciones = {true}/>
        </Grid>
    )
}
