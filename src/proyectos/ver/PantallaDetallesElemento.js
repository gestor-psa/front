import React, {Fragment} from "react";
import Fecha from "soporte/common/Fecha";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
//import Moment from 'moment';

export default (
    {
        esProyecto, //esFase, esIteracion,
        mostrar, nombre, descripcion, responsableDni, estado, fechaInicio, fechaFin
    }) => {
    const [responsable, setResponsable] = React.useState(false);

    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ setResponsable(res.data);})
        }
    }, [responsableDni]);

    const getDays = (fi, ff) => {
        const date1 = new Date(fi);
        const date2 = new Date(ff);
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }

    const duracion = fechaInicio && fechaFin ;

    return (
        <Fragment>
                {<Typography variant='h4'>{nombre && nombre.capitalize()}</Typography>}
                {descripcion && <EsqueletoMultilinea
                    filas={3}
                    etiqueta='Descripción'
                    mostrar={mostrar}
                    valor={descripcion && descripcion.capitalize()}
                />}
                {esProyecto && <EsqueletoTexto
                    etiqueta='Responsable'
                    mostrar={mostrar}
                    valor={(responsable && responsable.name && (responsable.name+" "+responsable.surname)) || "Sin asignar"}
                />}
                {<EsqueletoTexto
                    etiqueta='Estado'
                    mostrar={mostrar}
                    valor={estado && estado.capitalize()}
                />}
                { <EsqueletoTexto
                    etiqueta='Fecha de inicio'
                    mostrar={mostrar}
                    valor={<Fecha fecha={fechaInicio}/>}
                />}
                { <EsqueletoTexto
                    etiqueta='Fecha de finalización'
                    mostrar={mostrar}
                    valor={<Fecha fecha={fechaFin}/>}
                />}
                {duracion && <EsqueletoTexto
                    etiqueta='Duracion'
                    mostrar={mostrar}
                    valor= {getDays(fechaInicio, fechaFin) + " dias"}
                />}
           
        </Fragment>
    )
}
