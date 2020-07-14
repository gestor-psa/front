import ListarTickets from "soporte/tickets/listar/ListarTickets";
import React, {Fragment} from "react";
import {useRouteMatch} from "react-router";
import CrearButton from "soporte/common/CrearButton";


export default () => {
    const {url} = useRouteMatch() || {};

    return (
        <Fragment>
            <ListarTickets/>
            <CrearButton url={`${url}/creacion`} texto="Nuevo ticket"/>
        </Fragment>
    )
}
