import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import Typography from "@material-ui/core/Typography";

export default (
    {
        mostrar, nombre, descripcion, responsable, estado, fechaInicio, fechaFin
    }) => {

    return (
        <Fragment>
                <Typography variant='h4'>{nombre && nombre.capitalize()}</Typography>
                <EsqueletoMultilinea
                    filas={3}
                    etiqueta='Descripción'
                    mostrar={mostrar}
                    valor={descripcion && descripcion.capitalize()}
                />
                <EsqueletoTexto
                    etiqueta='Responsable'
                    mostrar={mostrar}
                    valor={(responsable && responsable.capitalize()) || "Sin asignar"}
                />
                <EsqueletoTexto
                    etiqueta='Estado'
                    mostrar={mostrar}
                    valor={estado && estado.capitalize()}
                />
                <EsqueletoTexto
                    etiqueta='Fecha de inicio'
                    mostrar={mostrar}
                    valor={<Fecha fecha={fechaInicio}/>}
                />
                <EsqueletoTexto
                    etiqueta='Fecha de finalización'
                    mostrar={mostrar}
                    valor={<Fecha fecha={fechaFin}/>}
                />
           
        </Fragment>
    )
}
