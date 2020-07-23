import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

export default (
    {
        mostrar, nombre, descripcion, responsableDni=40743621, estado, fechaInicio, fechaFin
    }) => {
    const [responsable, setResponsable] = React.useState(false);

    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ setResponsable(res.data);console.log(res.data)})
        }
    }, [responsableDni]);

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
                    valor={(responsable.name && (responsable.name+" "+responsable.surname)) || "Sin asignar"}
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
