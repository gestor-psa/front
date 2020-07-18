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

export default ({onDataChange, register, errors, ticket = {}}) => {
    const classes = useStyles();

    return (
        <div>
            <TextField
                label='Nombre'
                className={classes.campo}
                key={'nombre' + ticket.nombre}
                defaultValue={ticket.nombre}
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
                key={'descripcion' + ticket.descripcion}
                defaultValue={ticket.descripcion}
                onChange={(e) => onDataChange({descripcion: e.target.value})}
                inputProps={{"aria-label": 'descripcion'}}
                // Validacion.
                required
                name='descripcion'
                error={Boolean(errors.descripcion)}
                inputRef={register({required: true})}
                helperText={errors.descripcion && 'La descripción es requerida'}
            />
            <SearchSelect
                // url={process.env.REACT_APP_URL_RECURSOS + '/empleados'}
                defaultValue={{nombre: ticket.responsable}}
                opciones={[
                    {
                        "nombre": "Juan Perez",
                        "id": 45357946
                    }, {
                        "nombre": "Sebastián Blázquez",
                        "id": 39917487
                    }, {
                        "nombre": "Carolina Martínez",
                        "id": 87542369
                    }
                ]}
                autocompleteProps={{
                    getOptionLabel: empleado => empleado.nombre || '',
                    getOptionSelected: (e1, e2) => e1.nombre === e2.nombre,
                    onChange: (e, v) => onDataChange({responsable: v && v.nombre})
                }}
                textFieldProps={{label: 'Responsable'}}
            />
        </div>
    )
}
