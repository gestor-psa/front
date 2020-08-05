import React, {useState} from "react";
import Layout from "soporte/common/Layout";
import axios from "axios";
import {useForm} from "react-hook-form";
import CamposDeTexto from "soporte/tickets/crear/CamposDeTexto";
import CamposDeSeleccion from "soporte/tickets/crear/CamposDeSeleccion";
import Acciones from "soporte/common/Acciones";
import {useHistory} from "react-router";


export default ({onTicketChange}) => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState({tipo: 'consulta', severidad: 'baja'});
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();

    const onConfirmar = () => {
        setEsperando(true);
        console.log(data);
        axios.post(process.env.REACT_APP_URL_SOPORTE + '/tickets', data)
            .then((result) => {
                console.log(result);
                onTicketChange({...result.data, responsable: data.responsable, tareas: []})
                history.push(`/soporte/tickets/${result.data.id}`)
            })
            .catch(error => {
                // TODO.
                console.log(error);
            });
    }

    return (
        <Layout
            titulo='Crear Ticket'
            ladoIzquierdo={
                <CamposDeTexto
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <CamposDeSeleccion
                    errors={errors}
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
