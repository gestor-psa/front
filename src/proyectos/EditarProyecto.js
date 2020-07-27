import React, {useState} from "react";
import Layout from "proyectos/common/Layout";
import {useForm} from "react-hook-form";
import CamposDeTexto from "proyectos/crear/CamposDeTexto";
import CamposDeSeleccion from "proyectos/crear/CamposDeSeleccion";
import Acciones from "proyectos/crear/Acciones";
import CamposFecha from "proyectos/crear/CamposFecha.js"
import Grid from "@material-ui/core/Grid";


export default ({titulo, onConfirm = () => null, proyecto = {duracion: 0}}) => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState(proyecto);
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    

    /*useEffect(() => {
        //setData(proyecto); breaks stuff
    }, [proyecto])*/

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
                    proyecto = {proyecto}
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
                    <CamposFecha proyecto = {proyecto} onChange = {onDataChange}/>
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
