import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";


export default ({mostrar, nombre, razonSocial, cuit}) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='Nombre'
                mostrar={mostrar}
                valor={nombre}
            />
            <EsqueletoTexto
                etiqueta='Razón social'
                mostrar={mostrar}
                valor={razonSocial}
            />
            <EsqueletoTexto
                etiqueta='CUIT'
                mostrar={mostrar}
                valor={cuit}
            />
        </Fragment>
    )
}
