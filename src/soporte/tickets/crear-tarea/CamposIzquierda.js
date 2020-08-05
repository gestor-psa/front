import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchSelect from "soporte/common/SearchSelect";


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
            <SearchSelect
                url={process.env.REACT_APP_URL_PROYECTOS + '/proyectos'}
                autocompleteProps={{
                    getOptionLabel: proyecto => proyecto.nombre || '',
                    getOptionSelected: (e1, e2) => e1.id === e2.id,
                    onChange: (e, v) => onDataChange({proyectoId: v && v.id})
                }}
                textFieldProps={{
                    label: 'Proyecto',
                    // Validacion.
                    required: true,
                    name: 'proyecto',
                    error: Boolean(errors.proyecto),
                    inputRef: register({required: true}),
                    helperText: errors.proyecto && 'El proyecto es requerido'
                }}
            />
        </div>
    )
}
