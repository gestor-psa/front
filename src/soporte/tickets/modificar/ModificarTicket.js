import React, {useEffect, useState} from "react";
import Layout from "soporte/common/Layout";
import axios from "axios";
import {useForm} from "react-hook-form";
import CamposDeTexto from "soporte/tickets/crear/CamposDeTexto";
import CamposDeSeleccion from "soporte/tickets/crear/CamposDeSeleccion";
import Acciones from "soporte/common/Acciones";
import {useHistory, useParams} from "react-router";


export default ({ticket, onTicketChange}) => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState(ticket);
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        setData(ticket);
    }, [ticket])

    const onConfirmar = () => {
        setEsperando(true);
        axios.put(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id, data)
            .then((result) => {
                onTicketChange({...ticket, ...result.data});
                history.push(`/soporte/tickets/${result.data.id}`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (
        <Layout
            titulo='Modificar Ticket'
            ladoIzquierdo={
                <CamposDeTexto
                    ticket={ticket}
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <CamposDeSeleccion
                    conEstado={true}
                    ticket={ticket}
                    onDataChange={onDataChange}
                />}
            fin={
                <Acciones
                    esperando={esperando}
                    textoConfirmar='Modificar'
                    onConfirmar={handleSubmit(onConfirmar)}
                />}
        />
    )
}
