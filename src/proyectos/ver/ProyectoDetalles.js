import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
//import Moment from 'moment';

export default (
    {
        mostrar, nombre, descripcion, responsableDni, estado, fechaInicio, fechaFin
    }) => {
    const [responsable, setResponsable] = React.useState(false);

    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ setResponsable(res.data);console.log(res.data)})
        }
    }, [responsableDni]);

    var duracion;

    return (
        <Fragment>
                {<Typography variant='h4'>{nombre && nombre.capitalize()}</Typography>}
                {descripcion && <EsqueletoMultilinea
                    filas={3}
                    etiqueta='Descripción'
                    mostrar={mostrar}
                    valor={descripcion && descripcion.capitalize()}
                />}
                {responsableDni && <EsqueletoTexto
                    etiqueta='Responsable'
                    mostrar={mostrar}
                    valor={(responsable && responsable.name && (responsable.name+" "+responsable.surname)) || "Sin asignar"}
                />}
                {estado && <EsqueletoTexto
                    etiqueta='Estado'
                    mostrar={mostrar && estado}
                    valor={estado && estado.capitalize()}
                />}
                {fechaInicio && <EsqueletoTexto
                    etiqueta='Fecha de inicio'
                    mostrar={mostrar && fechaInicio}
                    valor={<Fecha fecha={fechaInicio}/>}
                />}
                {fechaFin && <EsqueletoTexto
                    etiqueta='Fecha de finalización'
                    mostrar={mostrar}
                    valor={<Fecha fecha={fechaFin}/>}
                />}
                {duracion && <EsqueletoTexto
                    etiqueta='Duracion en dias'
                    mostrar={mostrar && duracion}
                    valor={duracion+" dias"}
                />}
           
        </Fragment>
    )
}
