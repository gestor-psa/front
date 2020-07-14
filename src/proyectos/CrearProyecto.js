import React, {useState} from "react";
import Layout from "proyectos/common/Layout";
//import axios from "axios";
import {useForm} from "react-hook-form";
import CamposDeTexto from "proyectos/crear/CamposDeTexto";
import CamposDeSeleccion from "proyectos/crear/CamposDeSeleccion";
import Acciones from "proyectos/crear/Acciones";
import Fecha from "proyectos/common/Fecha.js"
import Grid from "@material-ui/core/Grid";
//import {useHistory} from "react-router";


export default () => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState({estado: 'en progreso'});
    const [esperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    //const history = useHistory();

    const onConfirmar = () => {
       /* setEsperando(true);
        console.log(data);
        axios.post(process.env.REACT_APP_URL_PROYECTOS + '/proyectos', data)
            .then((result) => {
                history.push(`/proyectos/${result.data.id}`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            }); */
    }

    return (
        <Layout
            titulo='Crear Proyecto'
            ladoIzquierdo={
                <CamposDeTexto
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <Grid >
                    <CamposDeSeleccion
                        onDataChange={onDataChange}
                    />
                    <Fecha name = "Fecha de Inicio">
                    </Fecha>
                    <Fecha name = {"Fecha de Fin"}>
                    </Fecha>
                </Grid>}
            fin={
                <Acciones
                    onConfirmar={handleSubmit(onConfirmar)}
                    esperando={esperando}
                    textoConfirmar='Crear'
                />}
        />
    )
}
