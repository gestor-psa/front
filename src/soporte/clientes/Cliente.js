import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from "react-router";
import axios from "axios";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import VerCliente from "soporte/clientes/ver/VerCliente";
import ModificarCliente from "soporte/clientes/modificar/ModificarCliente";


export default () => {
    const {id} = useParams();
    const {path} = useRouteMatch() || {};
    const [cliente, setCliente] = useState();

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_SOPORTE + '/clientes/' + id)
            .then(res => {
                setCliente(res.data);
            })
    }, [id]);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <VerCliente cliente={cliente}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarCliente cliente={cliente} onTicketChange={c => setCliente(c)}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
