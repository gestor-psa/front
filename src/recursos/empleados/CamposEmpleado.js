import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";


export default ({
                    mostrar, name, surname, dni, date_birth, organization_id,
                    pos, date_hire
                }) => {

    return (
        <Fragment>
            <EsqueletoTexto
                etiqueta='DNI'
                mostrar={mostrar}
                valor={dni}
            />
            <EsqueletoTexto
                etiqueta='Nombre y apellido'
                mostrar={mostrar}
                valor={name+" "+surname}
            />
            <EsqueletoTexto
                etiqueta='Fecha de nacimiento'
                mostrar={mostrar}
                valor={date_birth}
            />
            <EsqueletoTexto
                etiqueta='Legajo'
                mostrar={mostrar}
                valor={organization_id}
            />
            <EsqueletoTexto
                etiqueta='Fecha de contratación'
                mostrar={mostrar}
                valor={date_hire}
            />
            <EsqueletoTexto
                etiqueta='Puesto'
                mostrar={mostrar}
                valor={pos}
            />

        </Fragment>
    )
}
