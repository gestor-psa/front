import React, {useState, useEffect} from "react";
import Layout from "proyectos/common/Layout";
import {useForm} from "react-hook-form";
import CamposDeTexto from "proyectos/crear/CamposDeTexto";
import CamposDeSeleccion from "proyectos/crear/CamposDeSeleccion";
import Acciones from "proyectos/crear/Acciones";
import CamposFecha from "proyectos/crear/CamposFecha.js"
import CamposAsignacion from "proyectos/crear/CamposAsignacion.js"
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";


export default ({titulo, onConfirm = () => null, url, isTarea, isProyecto, elem}) => {
    const {register, errors, handleSubmit} = useForm();
    const [elemento, setElem] = useState(elem || {});
    const [data, setData] = useState(elemento);
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    
    

    useEffect(() => {
        if (url) {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url)
            .then(res => {
                setElem(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log(error.response);
            })
        }
    }, [url]);

    const getDays = (fi, ff) => {
        if (!fi || !ff) return 0;
        const date1 = new Date(fi);
        const date2 = new Date(ff);
        const diffTime = (date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }

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
                    mostrarEncargado = {isProyecto || isTarea}
                />}
            ladoDerecho={
                <Grid >
                    <CamposDeSeleccion
                        proyecto = {data}
                        onDataChange={onDataChange}
                        errors={errors}
                        register={register}
                        mostrarAsignacion = {isTarea}

                    />
                    {isTarea && <CamposDeSeleccion
                        titulo = {"Prioridad*"}
                        proyecto = {data}
                        isPrioridad = {isTarea}
                        onDataChange={onDataChange}
                        errors={errors}
                        register={register}
                        mostrarAsignacion = {isTarea}

                    />}
                    <CamposFecha proyecto = {elemento} 
                    errors={errors}
                    register={register}
                    onChange = {(e) => {
                        const newData = {...data, ...e};
                        if (getDays(newData.fechaInicio, newData.fechaFin) >= 0) {
                            onDataChange(e);
                            return true;
                        }
                    }}/>
                    {data.fechaInicio && data.fechaFin && 
                        <EsqueletoTexto
                            etiqueta='Duracion'
                            mostrar={true}
                            valor= {getDays(data.fechaInicio, data.fechaFin) + " dias"}
                        />
                    }
                    {isTarea && 
                        <CamposAsignacion
                            elemento = {data}
                            proyecto = {isTarea}
                            onDataChange={onDataChange}
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
