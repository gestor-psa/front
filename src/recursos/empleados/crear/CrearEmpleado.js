import React, {useState} from "react";
import Layout from "recursos/empleados/Layout";
import axios from "axios";
import {useForm} from "react-hook-form";
import CamposDeTexto from "recursos/empleados/crear/CamposDeTexto";
// import CamposDeSeleccion from "soporte/tickets/crear/CamposDeSeleccion";
import Acciones from "soporte/tickets/crear/Acciones";
import {useHistory} from "react-router";


export default () => {
    const {register, errors, handleSubmit} = useForm();
    const [data, setData] = useState({
        tipo: 'consulta',
        severidad: 'baja'
    });
    const [esperando, setEsperando] = useState(false);
    const onDataChange = (e) => setData({...data, ...e});
    const history = useHistory();

    const onCrear = () => {
        setEsperando(true);
        axios.post(process.env.REACT_APP_URL_RECURSOS + '/empleados', data)
            .then((result) => {
                history.push(`/recursos/empleados/${result.data.id}`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (
        <Layout
            titulo='Nuevo Empleado'
            ladoIzquierdo={
                <CamposDeTexto
                    errors={errors}
                    register={register}
                    onDataChange={onDataChange}
                />
            }
            fin={<Acciones onCrear={handleSubmit(onCrear)} esperando={esperando}/>}
        />
    )
}
