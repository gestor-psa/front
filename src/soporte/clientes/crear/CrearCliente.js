import React, {useState} from "react";
import Layout from "soporte/common/Layout";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import DatosPersonales from "soporte/clientes/crear/DatosPersonales";
import DatosInternos from "soporte/clientes/crear/DatosInternos";
import Acciones from "soporte/common/Acciones";


export default () => {
    const {control, register, errors, handleSubmit} = useForm();
    const [data, setData] = useState({estado: 'activo'});
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();

    const onConfirmar = () => {
        setEsperando(true);
        console.log(data);
        axios.post(process.env.REACT_APP_URL_SOPORTE + '/clientes', data)
            .then((result) => {
                history.push(`/soporte/clientes/${result.data.id}`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (
        <Layout
            titulo='Cargar cliente'
            ladoIzquierdo={
                <DatosPersonales
                    errors={errors}
                    register={register}
                    control={control}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <DatosInternos
                    errors={errors}
                    control={control}
                    register={register}
                    onDataChange={onDataChange}
                />}
            fin={
                <Acciones
                    onConfirmar={handleSubmit(onConfirmar)}
                    esperando={esperando}
                    textoConfirmar='Crear'
                />}
        />
    )
}
