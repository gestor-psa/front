import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useMediaQuery} from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import {Assignment, Delete, Edit} from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1),
        position: 'relative'
    },
    acciones: {
        margin: theme.spacing(0, 2)
    },
    eliminar: {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main, //theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: '#f443361c'
        }
    },
    tarea: {
        borderColor: theme.palette.warning.dark,
        color: theme.palette.warning.dark,
        '&:hover': {
            backgroundColor: '#f57c001c'
        }
    },

    masAccionesWrapper: {
        height: 60
    },
    masAcciones: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    eliminarSm: {
        color: theme.palette.error.main
    },
    crearTareaSm: {
        color: theme.palette.warning.dark
    },
    modificarSm: {
        color: theme.palette.info.dark
    },
    backdrop: {
        zIndex: 1000,
        color: '#fff',
    }
}));

export default () => {
    const classes = useStyles();
    const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

    const [open, setOpen] = React.useState(false);

    const actions = [
        {icon: <Edit className={classes.modificarSm}/>, name: <span className={classes.modificarSm}>Modificar</span>},
        {icon: <Assignment className={classes.crearTareaSm}/>, name: <span className={classes.crearTareaSm}>Crear&nbsp;Tarea</span>},
        {icon: <Delete className={classes.eliminarSm}/>, name: <span className={classes.eliminarSm}>Eliminar</span>},
    ];

    return (
        <div className={classes.root}>
            {isMdUp ? (
                <Fragment>
                    <Button
                        variant="outlined"
                        className={`${classes.acciones} ${classes.eliminar}`}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant="outlined"
                        className={`${classes.acciones} ${classes.tarea}`}
                    >
                        Crear tarea
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.acciones}
                    >
                        Modificar
                    </Button>
                </Fragment>
            ) : (
                <div className={classes.masAccionesWrapper}>
                    <Backdrop open={open} className={classes.backdrop}/>
                    <SpeedDial
                        className={classes.masAcciones}
                        icon={<SpeedDialIcon/>}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        FabProps={{color: "secondary"}}
                        ariaLabel="acciones"
                    >
                        {actions.map((action, key) => (
                            <SpeedDialAction
                                key={key}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen
                            />
                        ))}
                    </SpeedDial>
                </div>
            )}
        </div>
    )
}
