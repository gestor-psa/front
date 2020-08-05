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

export default ({register, errors, onDataChange, ticket = {}, conEstado = false}) => {
    const classes = useStyles();

    const tipos = [
        {
            etiqueta: 'Consulta',
            valor: 'consulta'
        }, {
            etiqueta: 'Mejora',
            valor: 'mejora'
        }, {
            etiqueta: 'Incidencia',
            valor: 'incidencia'
        }
    ];

    const severidades = [
        {
            etiqueta: 'Baja',
            valor: 'baja'
        }, {
            etiqueta: 'Media',
            valor: 'media'
        }, {
            etiqueta: 'Alta',
            valor: 'alta'
        }];

    const estados = [
        {
            etiqueta: 'Pendiente',
            valor: 'pendiente'
        }, {
            etiqueta: 'Iniciado',
            valor: 'iniciado'
        }, {
            etiqueta: 'Cerrado',
            valor: 'cerrado'
        }];

    return (
        <div>
            <SearchSelect
                url={process.env.REACT_APP_URL_SOPORTE + '/clientes'}
                defaultValue={ticket.cliente || null}
                autocompleteProps={{
                    getOptionLabel: c => c.nombre || '',
                    getOptionSelected: (c1, c2) => c1.id === c2.id,
                    onChange: (c, cliente) => {
                        onDataChange({
                            cliente: cliente,
                            clienteId: cliente && cliente.id
                        })
                    }
                }}
                textFieldProps={{
                    label: 'Cliente',
                    // Validacion.
                    required: true,
                    name: 'cliente',
                    error: Boolean(errors.cliente),
                    inputRef: register({required: true}),
                    helperText: errors.cliente && 'El cliente es requerido'
                }}
            />
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Tipo *
            </Typography>
            <SeleccionDeGrupo
                opciones={tipos}
                key={ticket.tipo}
                seleccionPorDefecto={ticket.tipo}
                onChange={({valor}) => onDataChange({tipo: valor})}
            />
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Severidad *
            </Typography>
            <SeleccionDeGrupo
                opciones={severidades}
                key={ticket.severidad}
                seleccionPorDefecto={ticket.severidad}
                onChange={({valor}) => onDataChange({severidad: valor})}
            />
            {conEstado && (<>
                <Typography className={classes.etiquetaSeleccionDeGrupo}>
                    Estado *
                </Typography>
                <SeleccionDeGrupo
                    opciones={estados}
                    key={ticket.estado}
                    seleccionPorDefecto={ticket.estado}
                    onChange={({valor}) => onDataChange({estado: valor})}
                />
            </>)}
        </div>
    )
}
