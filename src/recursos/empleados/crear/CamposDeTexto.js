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
                label='DNI'
                className={classes.campo}
                onChange={(e) => onDataChange({dni: e.target.value})}
                // Validacion.
                required
                name='dni'
                error={Boolean(errors.dni)}
                inputRef={register({required: true})}
                helperText={errors.dni && 'El DNI es requerido'}
            />
            <TextField
                label='Nombre'
                className={classes.campo}
                onChange={(e) => onDataChange({name: e.target.value})}
                // Validacion.
                required
                name='nombre'
                error={Boolean(errors.nombre)}
                inputRef={register({required: true})}
                helperText={errors.nombre && 'El nombre es requerido'}
            />
            <TextField
                label='Apellido'
                className={classes.campo}
                onChange={(e) => onDataChange({surname: e.target.value})}
                // Validacion.
                required
                name='apellido'
                error={Boolean(errors.apellido)}
                inputRef={register({required: true})}
                helperText={errors.apellido && 'El apellido es requerido'}
            />
            <TextField
                label='Fecha de nacimiento'
                className={classes.campo}
                onChange={(e) => onDataChange({date_birth: e.target.value})}
                // Validacion.
                required
                name='nacimiento'
                error={Boolean(errors.nacimiento)}
                inputRef={register({required: true})}
                helperText={errors.nacimiento && 'La fecha de nacimiento es requerida'}
            />
            <TextField
                label='Legajo'
                className={classes.campo}
                onChange={(e) => onDataChange({organization_id: e.target.value})}
                // Validacion.
                required
                name='legajo'
                error={Boolean(errors.legajo)}
                inputRef={register({required: true})}
                helperText={errors.legajo && 'El legajo es requerido'}
            />
            <TextField
                label='Fecha de contratación'
                className={classes.campo}
                onChange={(e) => onDataChange({date_hired: e.target.value})}
                // Validacion.
                required
                name='contratacion'
                error={Boolean(errors.contratacion)}
                inputRef={register({required: true})}
                helperText={errors.contratacion && 'La fecha de contratación es requerida'}
            />
            <TextField
                label='Puesto'
                className={classes.campo}
                onChange={(e) => onDataChange({pos: e.target.value})}
                // Validacion.
                required
                name='puesto'
                error={Boolean(errors.puesto)}
                inputRef={register({required: true})}
                helperText={errors.puesto && 'El puesto es requerido'}
            />
        </div>
    )
}
