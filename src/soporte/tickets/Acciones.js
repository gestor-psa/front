import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useMediaQuery} from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import {Assignment, Delete, Edit} from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";
import {useHistory, useRouteMatch} from "react-router";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1),
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

    masAcciones: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
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
        backgroundColor: 'rgba(0,0,0,0.34)',
    }
}));

export default ({mostrar}) => {
    const classes = useStyles();
    const {url} = useRouteMatch();
    const history = useHistory();
    const isMdUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

    const [open, setOpen] = React.useState(false);

    const onModificar = () => history.push(`${url}/modificacion`)

    const actions = [
        {
            icon: <Edit className={classes.modificarSm} onClick={onModificar}/>,
            name: <span className={classes.modificarSm} onClick={onModificar}>Modificar</span>
        }, {
            icon: <Assignment className={classes.crearTareaSm}/>,
            name: <span className={classes.crearTareaSm}>Crear&nbsp;Tarea</span>
        }, {
            icon: <Delete className={classes.eliminarSm}/>,
            name: <span className={classes.eliminarSm}>Eliminar</span>
        },
    ];

    return (
        <Fragment>
            {isMdUp ? (
                <div className={classes.root}>
                    <Button
                        disabled={!mostrar}
                        variant="outlined"
                        className={`${classes.acciones} ${classes.eliminar}`}
                    >
                        Eliminar
                    </Button>
                    <Button
                        disabled={!mostrar}
                        variant="outlined"
                        className={`${classes.acciones} ${classes.tarea}`}
                    >
                        Crear tarea
                    </Button>
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
            ) : (
                <div>
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
        </Fragment>
    )
}
