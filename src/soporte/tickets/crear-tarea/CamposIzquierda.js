import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    }
}));

export default ({onDataChange, register, errors}) => {
    const classes = useStyles();

    return (
        <div>
            <TextField
                label='Nombre'
                className={classes.campo}
                onChange={(e) => onDataChange({nombre: e.target.value})}
                inputProps={{"aria-label": 'nombre'}}
                // Validacion.
                required
                name='nombre'
                error={Boolean(errors.nombre)}
                inputRef={register({required: true})}
                helperText={errors.nombre && 'El nombre es requerido'}
            />
            <TextField
                rows={8}
                rowsMax={16}
                multiline
                label='Descripción'
                className={classes.campo}
                onChange={(e) => onDataChange({descripcion: e.target.value})}
                inputProps={{"aria-label": 'descripcion'}}
                // Validacion.
                required
                name='descripcion'
                error={Boolean(errors.descripcion)}
                inputRef={register({required: true})}
                helperText={errors.descripcion && 'La descripción es requerida'}
            />
        </div>
    )
}
