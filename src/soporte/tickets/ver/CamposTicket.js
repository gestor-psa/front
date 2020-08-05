import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";


export default (
    {
        mostrar, id, nombre, descripcion, responsable, tipo,
        severidad, estado, fechaDeCreacion, fechaDeActualizacion,
        fechaDeCierre, cliente
    }) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='Código'
                mostrar={mostrar}
                valor={`#${id}`}
            />
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
                valor={responsable && `${responsable.name} ${responsable.surname}`}
            />
            <EsqueletoTexto
                etiqueta='Cliente'
                mostrar={mostrar}
                valor={cliente && cliente.nombre}
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
            <EsqueletoTexto
                etiqueta='Fecha de cierre'
                mostrar={mostrar}
                valor={<Fecha fecha={fechaDeCierre}/>}
            />
        </Fragment>
    )
}
