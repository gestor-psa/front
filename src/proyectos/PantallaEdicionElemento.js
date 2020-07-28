import React, {useState, useEffect} from "react";
import Layout from "proyectos/common/Layout";
import {useForm} from "react-hook-form";
import CamposDeTexto from "proyectos/crear/CamposDeTexto";
import CamposDeSeleccion from "proyectos/crear/CamposDeSeleccion";
import Acciones from "proyectos/crear/Acciones";
import CamposFecha from "proyectos/crear/CamposFecha.js"
import Grid from "@material-ui/core/Grid";
import axios from "axios";


export default ({titulo, onConfirm = () => null, url}) => {
    const {register, errors, handleSubmit} = useForm();
    const [elemento, setElem] = useState({duracion: 0});
    const [data, setData] = useState(elemento);
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    
    console.log(url)

    useEffect(() => {
        if (url) {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url)
            .then(res => {
                setElem(res.data);
                setData(res.data);
            })
            .catch(error => {
                // TODO.
            })
        }
    }, [url]);

    const onConfirmar = () => {
       setEsperando(true);
        console.log(data);
        onConfirm(data);
    }


    return (
        <Layout
            titulo={titulo}
            ladoIzquierdo={
                <CamposDeTexto
                    proyecto = {elemento}
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <Grid >
                    <CamposDeSeleccion
                        proyecto = {data}
                        onDataChange={onDataChange}
                    />
                    <CamposFecha proyecto = {elemento} onChange = {onDataChange}/>
                </Grid>}
            fin={
                <Acciones
                    onConfirmar={handleSubmit(onConfirmar)}
                    esperando={esperando}
                    textoConfirmar='Confirmar'
                />}
        />
    )
}
