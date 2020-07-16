import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Cuit from "soporte/clientes/crear/Cuit";


const useStyles = makeStyles(theme => ({
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    }
}));

export default ({onDataChange, control, register, errors, cliente = {}}) => {
    const classes = useStyles();

    return (
        <div>
            <TextField
                label='Nombre'
                className={classes.campo}
                key={cliente.nombre}
                defaultValue={cliente.nombre}
                onChange={(e) => onDataChange({nombre: e.target.value})}
                // Validacion.
                required
                name='nombre'
                error={Boolean(errors.nombre)}
                inputRef={register({required: true})}
                helperText={errors.nombre && 'El nombre es requerido'}
            />
            <TextField
                label='Razón Social'
                className={classes.campo}
                key={cliente.razonSocial}
                defaultValue={cliente.razonSocial}
                onChange={(e) => onDataChange({razonSocial: e.target.value})}
                // Validacion.
                required
                name='razonSocial'
                error={Boolean(errors.razonSocial)}
                inputRef={register({required: true})}
                helperText={errors.razonSocial && 'La razón social es requerida'}
            />
            <Cuit
                onDataChange={onDataChange}
                control={control}
                errors={errors}
                defaultValue={cliente.cuit}
                className={classes.campo}
            />
        </div>
    )
}
