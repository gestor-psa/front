import React, {Fragment} from "react";
import {useHistory, useRouteMatch} from "react-router";
import AccionesDesktop from "soporte/clientes/ver/acciones/AccionesDesktop";


export default ({mostrar}) => {
    const {url} = useRouteMatch() || {};
    const history = useHistory();

    const onModificar = () => history.push(`${url}/modificacion`)

    return (
        <Fragment>
            <AccionesDesktop
                mostrar={mostrar}
                onModificar={onModificar}
            />
        </Fragment>
    )
}
