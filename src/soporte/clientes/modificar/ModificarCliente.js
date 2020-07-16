import React, {useEffect, useState} from "react";
import Layout from "soporte/common/Layout";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router";
import DatosPersonales from "soporte/clientes/crear/DatosPersonales";
import DatosInternos from "soporte/clientes/crear/DatosInternos";
import Acciones from "soporte/common/Acciones";


export default ({cliente, onClienteChange}) => {
    const {control, register, errors, handleSubmit} = useForm();
    const [data, setData] = useState(cliente);
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        setData(cliente);
    }, [cliente])

    const onConfirmar = () => {
        setEsperando(true);
        console.log(data);
        axios.put(process.env.REACT_APP_URL_SOPORTE + '/clientes/' + id, data)
            .then((result) => {
                console.log(result);
                onClienteChange(result.data)
                history.push(`/soporte/clientes/${result.data.id}`)
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (
        <Layout
            titulo='Modificar cliente'
            ladoIzquierdo={
                <DatosPersonales
                    errors={errors}
                    register={register}
                    control={control}
                    onDataChange={onDataChange}
                    cliente={cliente}
                />}
            ladoDerecho={
                <DatosInternos
                    errors={errors}
                    control={control}
                    register={register}
                    onDataChange={onDataChange}
                    cliente={cliente}
                />}
            fin={
                <Acciones
                    onConfirmar={handleSubmit(onConfirmar)}
                    esperando={esperando}
                    textoConfirmar='Modificar'
                />}
        />
    )
}
