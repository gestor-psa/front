import React, {useState} from "react";
import ConfirmacionContext from "contexts/ConfirmacionContext";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    alert: {
        marginTop: theme.spacing(10),
        border: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.primary.dark,
        borderRadius: 5
    }
}));

export default ({children}) => {
    const classes = useStyles();

    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const confirmacionContextValue = {
        setMostrar: valor => setMostrar(valor),
        setMensaje: valor => setMensaje(valor),
    };

    return (
        <ConfirmacionContext.Provider value={confirmacionContextValue}>
            {mostrar && (
                <Snackbar
                    open={mostrar}
                    className={classes.snackbar}
                    onClose={() => setMostrar(false)}
                    anchorOrigin={{horizontal: 'center', vertical: 'top'}}
                >
                    <Alert
                        severity="success"
                        className={classes.alert}
                        onClose={() => setMostrar(false)}
                    >
                        {mensaje}
                    </Alert>
                </Snackbar>
            )}
            {children}
        </ConfirmacionContext.Provider>
    )
}
