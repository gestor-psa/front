import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";


export default (
    {
        mostrar, nombre, descripcion, responsable, tipo,
        severidad, estado, fechaDeCreacion, fechaDeActualizacion
    }) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='Nombre'
                mostrar={mostrar}
                valor={nombre}
            />
            <EsqueletoMultilinea
                filas={3}
                etiqueta='Descripción'
                mostrar={mostrar}
                valor={descripcion}
            />
            <EsqueletoTexto
                etiqueta='Responsable'
                mostrar={mostrar}
                valor={responsable}
            />
            <EsqueletoTexto
                etiqueta='Tipo'
                mostrar={mostrar}
                valor={tipo && tipo.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Severidad'
                mostrar={mostrar}
                valor={severidad && severidad.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Estado'
                mostrar={mostrar}
                valor={estado && estado.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Fecha de creación'
                mostrar={mostrar}
                valor={<Fecha fecha={fechaDeCreacion}/>}
            />
            <EsqueletoTexto
                etiqueta='Fecha de actualización'
                mostrar={mostrar}
                valor={<Fecha fecha={fechaDeActualizacion}/>}
            />
        </Fragment>
    )
}
