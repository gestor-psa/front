import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Layout from "proyectos/common/Layout";

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
        <Layout
               titulo = {<Typography variant='h4'>{nombre && nombre.capitalize()}</Typography>}
                ladoIzquierdo = { 
                <Fragment>  
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
                </Fragment> 
                }
                ladoDerecho = {
                <Fragment>{ 
                <EsqueletoTexto
                    etiqueta='Fecha de inicio'
                    mostrar={mostrar}
                    valor={fechaInicio}
                    />}
                    { <EsqueletoTexto
                        etiqueta='Fecha de finalización'
                        mostrar={mostrar}
                        valor={fechaFin}
                    />}
                    {duracion && <EsqueletoTexto
                        etiqueta='Duracion'
                        mostrar={mostrar}
                        valor= {getDays(fechaInicio, fechaFin) + " dias"}
                    />}
                </Fragment>
                }
           
        />
    )
}
