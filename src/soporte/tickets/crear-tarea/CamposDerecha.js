import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";


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
                rows={8}
                rowsMax={16}
                multiline
                className={classes.campo}
                label='Descripción'
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
