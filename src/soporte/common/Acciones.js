import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ColoredButton from "soporte/common/ColoredButton";
import {useHistory} from "react-router";
import ProgressButton from "soporte/common/ProgressButton";


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

export default ({onConfirmar, textoConfirmar, esperando}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.acciones}>
            <ProgressButton
                color='info'
                variant='outlined'
                onClick={onConfirmar}
                inProgress={esperando}
            >
                {textoConfirmar}
            </ProgressButton>
            <ColoredButton
                color='error'
                variant='outlined'
                onClick={() => history.goBack()}
            >
                Cancelar
            </ColoredButton>
        </div>
    )
}
