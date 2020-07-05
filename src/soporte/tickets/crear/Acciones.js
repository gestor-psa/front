import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ColoredButton from "soporte/common/ColoredButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from "react-router";


const useStyles = makeStyles(theme => ({
    acciones: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    },
    accion: {
        margin: theme.spacing(0, 2)
    },
    progreso: {
        marginRight: theme.spacing(1.5)
    }
}));

export default ({onCrear, esperando}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.acciones}>
            <ColoredButton
                color='info'
                className={classes.accion}
                onClick={onCrear}
            >
                {esperando && <CircularProgress
                    size={20}
                    color='inherit'
                    className={classes.progreso}
                />}
                Crear
            </ColoredButton>
            <ColoredButton
                color='error'
                onClick={() => history.goBack()}
            >
                Cancelar
            </ColoredButton>
        </div>
    )
}
