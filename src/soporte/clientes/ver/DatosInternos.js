import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import Fecha from "soporte/common/Fecha";


export default ({mostrar, fechaDesdeQueEsCliente, estado, id}) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='Código de cliente'
                mostrar={mostrar}
                valor={`#${id}`}
            />
            <EsqueletoTexto
                etiqueta='Estado'
                mostrar={mostrar}
                valor={estado && estado.capitalize()}
            />
            <EsqueletoTexto
                etiqueta='Fecha desde que es cliente'
                mostrar={mostrar}
                valor={<Fecha fecha={fechaDesdeQueEsCliente} formato="DD/MM/YYYY"/>}
            />
        </Fragment>
    )
}
