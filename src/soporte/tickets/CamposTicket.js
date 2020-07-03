import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";


export default ({
                    nombre, descripcion, responsable, tipo, severidad,
                    estado, fechaDeCreacion, fechaDeActualizacion
                }) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='Nombre'
                mostrar={!nombre}
                valor={nombre}
            />
            <EsqueletoMultilinea
                filas={3}
                etiqueta='Descripción'
                mostrar={!descripcion}
                valor={descripcion}
            />
            <EsqueletoTexto
                etiqueta='Responsable'
                mostrar={!responsable}
                valor={responsable}
            />
            <EsqueletoTexto
                etiqueta='Tipo'
                mostrar={!tipo}
                valor={tipo && tipo.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Severidad'
                mostrar={!severidad}
                valor={severidad && severidad.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Estado'
                mostrar={!estado}
                valor={estado && estado.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Fecha de creación'
                mostrar={!fechaDeCreacion}
                valor={<Fecha fecha={fechaDeCreacion}/>}
            />
            <EsqueletoTexto
                etiqueta='Fecha de actualización'
                mostrar={!fechaDeActualizacion}
                valor={<Fecha fecha={fechaDeActualizacion}/>}
            />
        </Fragment>
    )
}
