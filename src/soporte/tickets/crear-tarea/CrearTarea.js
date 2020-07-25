import React, {useState} from "react";
import Layout from "soporte/common/Layout";
import CamposDerecha from "soporte/tickets/crear-tarea/CamposDerecha";
import CamposIzquierda from "soporte/tickets/crear-tarea/CamposIzquierda";
import Acciones from "soporte/common/Acciones";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import axios from "axios";


export default ({ticket, onTicketChange}) => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState({tipo: 'consulta', severidad: 'baja'});
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();

    const onConfirmar = () => {
        setEsperando(true);
        console.log(data);
        axios.post(`${process.env.REACT_APP_URL_PROYECTOS}/proyectos/${data.proyectoId}/tareas`, data)
            .then((result) => {
                console.log(result);
                onTicketChange({...ticket, tareas: [...ticket.tareas, result.data]})
                history.push(`/soporte/tickets/${ticket.id}`)
            })
            .catch(error => {
                // TODO.
                console.log(error);
            });
    }

    return (
        <Layout
            titulo='Crear Tarea'
            ladoIzquierdo={
                <CamposIzquierda
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            ladoDerecho={
                <CamposDerecha
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />}
            fin={<Acciones
                onConfirmar={handleSubmit(onConfirmar)}
                esperando={esperando}
                textoConfirmar='Crear'
            />}
        />
    )
}
