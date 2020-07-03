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
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    escalar: {
        background: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        }
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                className={`${classes.acciones} ${classes.eliminar}`}
            >
                Eliminar
            </Button>
            <Button
                color="secondary"
                variant="contained"
                className={`${classes.acciones} ${classes.escalar}`}
            >
                Escalar a desarrollo
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
