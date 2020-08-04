import React, {useState, useEffect} from "react";
import Layout from "proyectos/common/Layout";
import {useForm} from "react-hook-form";
import CamposDeTexto from "proyectos/crear/CamposDeTexto";
import CamposDeSeleccion from "proyectos/crear/CamposDeSeleccion";
import Acciones from "proyectos/crear/Acciones";
import CamposFecha from "proyectos/crear/CamposFecha.js"
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";


export default ({titulo, onConfirm = () => null, url, isTarea, isProyecto}) => {
    const {register, errors, handleSubmit} = useForm();
    const [elemento, setElem] = useState({});
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

    const getDays = (fi, ff) => {
        const date1 = new Date(fi);
        const date2 = new Date(ff);
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
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
                    mostrarEncargado = {isProyecto || isTarea}
                />}
            ladoDerecho={
                <Grid >
                    <CamposDeSeleccion
                        proyecto = {data}
                        onDataChange={onDataChange}
                        mostrarAsignacion = {isTarea}

                    />
                    <CamposFecha proyecto = {elemento} onChange = {onDataChange}/>
                    {elemento.fechaInicio && elemento.fechaFin && 
                        <EsqueletoTexto
                            etiqueta='Duracion'
                            mostrar={true}
                            valor= {getDays(elemento.fechaInicio, elemento.fechaFin) + " dias"}
                        />
                    }
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
