import React, {Fragment, useContext} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router";
import AccionesDesktop from "soporte/tickets/ver/acciones/AccionesDesktop";
import AccionesMobile from "soporte/tickets/ver/acciones/AccionesMobile";
import Hidden from "@material-ui/core/Hidden";
import axios from "axios";
import ConfirmacionContext from "contexts/ConfirmacionContext";


export default ({mostrar}) => {
    const {url} = useRouteMatch() || {};
    const {id} = useParams();
    const history = useHistory();

    const {setMostrar, setMensaje} = useContext(ConfirmacionContext);

    const onModificar = () => history.push(`${url}/modificacion`)

    const onEliminar = () => {
        axios.delete(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then((result) => {
                history.push('/soporte/tickets')
                setMensaje('Ticket eliminado');
                setMostrar(true);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    const onCrearTarea = () => {
        // TODO.
    }

    return (
        <Fragment>
            <Hidden smDown>
                <AccionesDesktop
                    mostrar={mostrar}
                    onEliminar={onEliminar}
                    onModificar={onModificar}
                    onCrearTarea={onCrearTarea}
                />
            </Hidden>
            <Hidden mdUp>
                <AccionesMobile
                    mostrar={mostrar}
                    onEliminar={onEliminar}
                    onModificar={onModificar}
                    onCrearTarea={onCrearTarea}
                />
            </Hidden>
        </Fragment>
    )
}
