import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SeleccionDeGrupo from "soporte/common/SeleccionDeGrupo";
import Typography from "@material-ui/core/Typography";
import SelectorFecha from "soporte/common/SelectorFecha";
import {Controller} from "react-hook-form";


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
                <Controller
                    render={({onChange}) => (
                        <SelectorFecha
                            label="Fecha desde que es cliente"
                            onChange={v => {
                                onChange(v);
                                onDataChange({fechaDesdeQueEsCliente: v.format('YYYY-MM-DD')})
                            }}
                            required
                            error={Boolean(errors.fechaDesdeQueEsCliente)}
                            helperText={errors.fechaDesdeQueEsCliente && fechaErrors[errors.fechaDesdeQueEsCliente.type]}
                        />
                    )}
                    name='fechaDesdeQueEsCliente'
                    control={control}
                    rules={{required: true, validate: v => v.isValid()}}
                />
            </div>
        </div>
    )
}
