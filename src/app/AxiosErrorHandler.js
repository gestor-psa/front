import React, {useEffect, useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    snackbar: {
        bottom: 30
    }
}));

export default () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const classes = useStyles();

    useEffect(() => {
        axios.interceptors.response.use(res => {
            return res;
        }, err => {
            if ((500 <= err.response.status) && (err.response.status <= 599)) {
                setMessage('Ha ocurrido un error inesperado, por favor intente nuevamente en unos minutos.')
                setOpen(true);
                return new Promise(() => {
                });
            } else if (404 === err.response.status) {
                setMessage('No se ha encontrado el recurso que está buscando, por favor vuelva al inicio.')
                setOpen(true);
                return new Promise(() => {
                });
            }
            return Promise.reject(err);
        });
    }, [])

    return (
        <Snackbar open={open}
                  className={classes.snackbar}
                  onClose={() => setOpen(false)}
        >
            <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}
