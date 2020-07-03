import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    campoComentario: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    agregarComentarioWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    agregarComentario: {
        marginTop: theme.spacing(2)
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant='h6'>
                Comentarios:
            </Typography>
            <Typography>
                Aún no hay comentarios
            </Typography>
            <TextField
                label="Nuevo comentario"
                multiline
                rowsMax={4}
                color="secondary"
                className={classes.campoComentario}
                // value={value}
                // onChange={handleChange}
            />
            <div className={classes.agregarComentarioWrapper}>
                <Button
                    color="secondary"
                    variant="outlined"
                    className={classes.agregarComentario}
                >
                    Agregar comentario
                </Button>
            </div>
        </div>
    )
}
