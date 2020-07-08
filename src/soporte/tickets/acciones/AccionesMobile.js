import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {Assignment, Delete, Edit} from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";
import ConfirmarEliminar from "soporte/tickets/acciones/ConfirmarEliminar";


const useStyles = makeStyles(theme => ({
    masAcciones: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    },
    eliminar: {
        color: theme.palette.error.main
    },
    crearTarea: {
        color: theme.palette.warning.dark
    },
    modificar: {
        color: theme.palette.info.dark
    },
    backdrop: {
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.34)',
    }
}));

export default ({mostrar, onModificar, onEliminar, onCrearTarea, eliminarEnProceso}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [openEliminar, setOpenEliminar] = React.useState(false);
    const onAbrirEliminar = () => setOpenEliminar(true);
    const onNotEliminar = () => setOpenEliminar(false);

    useEffect(() => {
        !open && onNotEliminar();
    }, [open])

    const dialActions = [
        {
            icon: <Edit className={classes.modificar} onClick={onModificar}/>,
            title: <span className={classes.modificar} onClick={onModificar}>Modificar</span>
        }, {
            icon: <Assignment className={classes.crearTarea} onClick={onCrearTarea}/>,
            title: <span className={classes.crearTarea} onClick={onCrearTarea}>Crear&nbsp;Tarea</span>
        }, {
            icon: <Delete className={classes.eliminar} onClick={onAbrirEliminar}/>,
            title: (
                <ConfirmarEliminar
                    open={openEliminar}
                    onCancelar={onNotEliminar}
                    onConfirmar={onEliminar}
                    eliminarEnProceso={eliminarEnProceso}
                >
                    <span className={classes.eliminar} onClick={onAbrirEliminar}>Eliminar</span>
                </ConfirmarEliminar>
            )
        },
    ];

    return (
        <>
            <Backdrop open={open} className={classes.backdrop}/>
            <SpeedDial
                disabled={!mostrar}
                className={classes.masAcciones}
                icon={<SpeedDialIcon/>}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                FabProps={{color: "secondary", disabled: !mostrar}}
                ariaLabel="acciones"
            >
                {dialActions.map((action, key) => (
                    <SpeedDialAction
                        key={key}
                        icon={action.icon}
                        tooltipTitle={action.title}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>
        </>
    )
}
