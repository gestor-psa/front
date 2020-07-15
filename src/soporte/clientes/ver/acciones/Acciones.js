import React, {Fragment, useContext} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router";
import axios from "axios";
import ConfirmacionContext from "contexts/ConfirmacionContext";
import AccionesDesktop from "soporte/clientes/ver/acciones/AccionesDesktop";


export default ({mostrar}) => {
    const {url} = useRouteMatch() || {};
    const {id} = useParams();
    const history = useHistory();

    const {setMostrar, setMensaje} = useContext(ConfirmacionContext);

    const onModificar = () => history.push(`${url}/modificacion`)

    const onEliminar = () => {
        axios.delete(process.env.REACT_APP_URL_SOPORTE + '/clientes/' + id)
            .then((result) => {
                history.push('/soporte/clientes')
                setMensaje('Cliente eliminado');
                setMostrar(true);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (
        <Fragment>
            <AccionesDesktop
                mostrar={mostrar}
                onEliminar={onEliminar}
                onModificar={onModificar}
            />
        </Fragment>
    )
}
