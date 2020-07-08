import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ConfirmarEliminar from "soporte/tickets/acciones/ConfirmarEliminar";
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

export default ({mostrar, onModificar, onEliminar, onCrearTarea, eliminarEnProceso}) => {
    const classes = useStyles();

    const [openEliminar, setOpenEliminar] = React.useState(false);
    const onAbrirEliminar = () => setOpenEliminar(true);
    const onNotEliminar = () => setOpenEliminar(false);

    return (
        <div className={classes.root}>
            <ConfirmarEliminar
                open={openEliminar}
                onCancelar={onNotEliminar}
                onConfirmar={onEliminar}
                eliminarEnProceso={eliminarEnProceso}
            >
                <ColoredButton
                    onClick={onAbrirEliminar}
                    disabled={!mostrar}
                    variant='outlined'
                    color='error'
                    className={classes.acciones}
                >
                    Eliminar
                </ColoredButton>
            </ConfirmarEliminar>
            <ColoredButton
                onClick={onCrearTarea}
                disabled={!mostrar}
                variant='outlined'
                color='warning'
                className={classes.acciones}
            >
                Crear tarea
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
