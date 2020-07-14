import React from 'react';
import ListarClientes from "soporte/clientes/listar/ListarClientes";
import {useRouteMatch} from "react-router";
import CrearButton from "soporte/common/CrearButton";


export default () => {
    const {url} = useRouteMatch() || {};

    return (
        <>
            <ListarClientes/>
            <CrearButton url={`${url}/creacion`} texto="Nuevo cliente"/>
        </>
    )
}
