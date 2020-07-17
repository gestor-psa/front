import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useRouteMatch} from "react-router";
import Button from "@material-ui/core/Button";
import ConfirmarTooltip from "soporte/common/ConfirmarTooltip";
import ColoredButton from "soporte/common/ColoredButton";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1),
    },
    acciones: {
        margin: theme.spacing(0, 2)
    }
}));

export default ({mostrar}) => {
    const classes = useStyles();
    const {url} = useRouteMatch() || {};
    const [openEliminar, setOpenEliminar] = useState(false);
    const onAbrirEliminar = () => setOpenEliminar(true);
    const onNotEliminar = () => setOpenEliminar(false);
    const history = useHistory();

    const onModificar = () => history.push(`${url}/modificacion`)

    const onEliminar = () => {
       /* axios.delete(process.env.REACT_APP_URL_SOPORTE + '/proyectos/' + id)
            .then((result) => {
                history.push('/proyectos')
                setMensaje('proyecto dado de baja');
                setMostrar(true);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
        */
    }

    const onFases = () => history.push(`${url}/fases`)

    const onTareas = () => history.push(`${url}/tareas`)

    return (
        <div className={classes.root}>
            <ConfirmarTooltip
                mensaje='¿Dar de baja proyecto?'
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
            <ColoredButton
                onClick={onFases}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Ver Fases
            </ColoredButton>
            <ColoredButton
                onClick={onTareas}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Ver Tareas
            </ColoredButton>
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
