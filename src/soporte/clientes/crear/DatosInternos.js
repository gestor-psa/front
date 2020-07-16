import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SeleccionDeGrupo from "soporte/common/SeleccionDeGrupo";
import Typography from "@material-ui/core/Typography";
import FechaDesdeQueEsCliente from "soporte/clientes/crear/FechaDesdeQueEsCliente";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1)
    }
}));

export default ({onDataChange, control, errors, cliente = {}}) => {
    const classes = useStyles();

    const estados = [
        {
            etiqueta: 'Activo',
            valor: 'activo'
        }, {
            etiqueta: 'Inactivo',
            valor: 'inactivo'
        }
    ];

    const fechaErrors = {
        required: 'La fecha desde la que es cliente es requerida',
        validate: 'La fecha no es válida'
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Estado *
            </Typography>
            <SeleccionDeGrupo
                opciones={estados}
                key={cliente.estado}
                seleccionPorDefecto={cliente.estado}
                onChange={({valor}) => onDataChange({estado: valor})}
            />
            <div className={classes.fecha}>
                <FechaDesdeQueEsCliente
                    label="Fecha desde que es cliente"
                    defaultValue={cliente.fechaDesdeQueEsCliente}
                    onDataChange={onDataChange}
                    required
                    error={Boolean(errors.fechaDesdeQueEsCliente)}
                    helperText={errors.fechaDesdeQueEsCliente && fechaErrors[errors.fechaDesdeQueEsCliente.type]}
                    control={control}
                />
            </div>
        </div>
    )
}
