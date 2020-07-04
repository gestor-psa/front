import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
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
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
            <Button
                color="secondary"
                variant="contained"
                className={classes.acciones}
            >
                Volver
            </Button>
        </div>
    )
}
