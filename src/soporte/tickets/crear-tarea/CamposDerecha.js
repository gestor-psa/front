import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SeleccionDeGrupo from "soporte/common/SeleccionDeGrupo";
import Typography from "@material-ui/core/Typography";
import SearchSelect from "soporte/common/SearchSelect";


const useStyles = makeStyles(theme => ({
    etiquetaSeleccionDeGrupo: {
        fontWeight: 600,
        marginTop: theme.spacing(2.5)
    }
}));

export default ({onDataChange, register, errors}) => {
    const classes = useStyles();

    const estados = [
        {
            etiqueta: 'No iniciado',
            valor: 'no-iniciado'
        }, {
            etiqueta: 'Iniciado',
            valor: 'iniciado'
        }, {
            etiqueta: 'Finalizado',
            valor: 'finalizado'
        }];

    return (
        <div>
            <SearchSelect
                url={process.env.REACT_APP_URL_PROYECTOS + '/proyectos'}
                autocompleteProps={{
                    getOptionLabel: proyecto => proyecto.nombre || '',
                    getOptionSelected: (e1, e2) => e1.nombre === e2.nombre,
                    onChange: (e, v) => onDataChange({proyectoId: v && v.id})
                }}
                textFieldProps={{
                    label: 'Proyecto',
                    // Validacion.
                    required: true,
                    name: 'proyecto',
                    error: Boolean(errors.proyecto),
                    inputRef: register({required: true}),
                    helperText: errors.descripcion && 'El proyecto es requerido'
                }}
            />
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Estado *
            </Typography>
            <SeleccionDeGrupo
                opciones={estados}
                onChange={({valor}) => onDataChange({estado: valor})}
            />
        </div>
    )
}
