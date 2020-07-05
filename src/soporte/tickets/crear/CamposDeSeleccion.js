import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SeleccionDeGrupo from "soporte/common/SeleccionDeGrupo";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    etiquetaSeleccionDeGrupo: {
        fontWeight: 600,
        marginTop: theme.spacing(2.5)
    }
}));

export default ({onDataChange}) => {
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

    return (
        <div>
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Tipo *
            </Typography>
            <SeleccionDeGrupo
                opciones={tipos}
                onChange={({valor}) => onDataChange({tipo: valor})}
            />
            <Typography className={classes.etiquetaSeleccionDeGrupo}>
                Severidad *
            </Typography>
            <SeleccionDeGrupo
                opciones={severidades}
                onChange={({valor}) => onDataChange({severidad: valor})}
            />
        </div>
    )
}
