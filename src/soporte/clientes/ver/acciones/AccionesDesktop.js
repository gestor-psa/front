import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
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
        margin: theme.spacing(0, 2),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0, 1)
        }
    }
}));

export default ({mostrar, onModificar, onEliminar}) => {
    const classes = useStyles();

    const [openEliminar, setOpenEliminar] = useState(false);
    const onAbrirEliminar = () => setOpenEliminar(true);
    const onNotEliminar = () => setOpenEliminar(false);

    return (
        <div className={classes.root}>
            <ConfirmarTooltip
                mensaje='¿Eliminar cliente?'
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
                    Eliminar
                </ColoredButton>
            </ConfirmarTooltip>
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
