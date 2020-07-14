import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    snackbar: {
        bottom: 30
    }
}));

export default ({mostrar, mensaje}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <Snackbar open={mostrar && open}
                  className={classes.snackbar}
                  onClose={() => setOpen(false)}
        >
            <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
                {mensaje}
            </Alert>
        </Snackbar>
    )
}
