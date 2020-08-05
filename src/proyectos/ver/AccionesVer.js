import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useRouteMatch, useParams} from "react-router";
import Button from "@material-ui/core/Button";
import ConfirmarTooltip from "soporte/common/ConfirmarTooltip";
import ColoredButton from "soporte/common/ColoredButton";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(3),
    },
    acciones: {
        margin: theme.spacing(0, 2)
    }
}));

export default ({mostrar, isFase, isTarea, isIteracion, updateElems}) => {
    const { id } = useParams();
    const classes = useStyles();
    const {url} = useRouteMatch() || {};
    const [openEliminar, setOpenEliminar] = useState(false);
    const onAbrirEliminar = () => setOpenEliminar(true);
    const onNotEliminar = () => setOpenEliminar(false);
    const history = useHistory();
    const verFases = (!isTarea && !isFase && !isIteracion);
    const verTareas = (!isTarea && !isFase);
    const verIteraciones = isFase;

    const onModificar = () => history.push(`${url}/modificacion`)

    const onEliminar = () => {
        axios.delete(process.env.REACT_APP_URL_PROYECTOS + url)
            .then((result) => {
               // updateElems();
                history.push(url.substring(0, url.length - 1 - (id.toString()).length ));
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
       
    }

    const onFases = () => history.push(`${url}/fases`)

    const onTareas = () => history.push(`${url}/tareas`)

    const onIteraciones = () => history.push(`${url}/iteraciones`)

    //const onAsignacion = () =>history.push(`${url}/asignar`);

    return (
        <div className={classes.root}>
            <ConfirmarTooltip
                mensaje='¿Dar de baja?'
                open={openEliminar}
                onCancelar={onNotEliminar}
                onConfirmar={onEliminar}
            >
                <ColoredButton
                    onClick={onAbrirEliminar}
                    disabled={!mostrar}
                    variant='outlined'
                    color='error'
                    className={classes.acciones}
                >
                    Dar de Baja
                </ColoredButton>
            </ConfirmarTooltip>
            {verFases && <ColoredButton
                onClick={onFases}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Ver Fases
            </ColoredButton>}
            {verIteraciones && <ColoredButton
                onClick={onIteraciones}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Ver Iteraciones
            </ColoredButton>}
            {verTareas && <ColoredButton
                onClick={onTareas}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Ver Tareas
            </ColoredButton>}
            <Button
                disabled={!mostrar}
                color="secondary"
                variant="contained"
                className={classes.acciones}
                onClick={onModificar}
            >
                Modificar
            </Button>
        </div>
    )
}
