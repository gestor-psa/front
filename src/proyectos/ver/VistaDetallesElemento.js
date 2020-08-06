import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import axios from "axios";
import Layout from "proyectos/common/Layout";

export default (
    {
        esProyecto, faseId, iteracionId, isTarea, type,
        mostrar, nombre, descripcion, responsableDni, estado, fechaInicio, fechaFin
    }) => {
    const [responsable, setResponsable] = React.useState(false);
    const def = {nombre : "Sin asignar"};
    const [fase, setFase] = React.useState(def);
    const [ite, setIte] = React.useState(def);
    
    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ setResponsable(res.data);})
        } else {
            setResponsable(false)
        }

        if (isTarea && faseId && iteracionId){
            axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + isTarea.id + "/fases/" + faseId)
            .then(res =>{ setFase(res.data);});
            axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + isTarea.id + "/fases/" + faseId + "/iteraciones/"+iteracionId)
            .then(res =>{ setIte(res.data);});
        }else {
            setFase({nombre : "Sin asignar"});
            setIte({nombre : "Sin asignar"});
        }

    }, [responsableDni, faseId, iteracionId, isTarea]);

    const getDays = (fi, ff) => {
        const date1 = new Date(fi);
        const date2 = new Date(ff);
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }

    const duracion = fechaInicio && fechaFin ;

    return (
        <Layout
               titulo = {nombre && (type + " - " + nombre.capitalize())}
                ladoIzquierdo = { 
                <Fragment>  
                    {descripcion && <EsqueletoMultilinea
                        filas={3}
                        etiqueta='Descripción'
                        mostrar={mostrar}
                        valor={descripcion && descripcion.capitalize()}
                    />}
                    {(esProyecto || isTarea) && <EsqueletoTexto
                        etiqueta='Responsable'
                        mostrar={mostrar}
                        valor={(responsable && responsable.name && (responsable.name+" "+responsable.surname)) || "Sin asignar"}
                    />}
                    {<EsqueletoTexto
                        etiqueta='Estado'
                        mostrar={mostrar}
                        valor={estado && estado.capitalize()}
                    />}
                     {isTarea && <EsqueletoTexto
                        etiqueta='Fase'
                        mostrar={mostrar}
                        valor={fase.nombre.capitalize()}
                    />}
                    {isTarea && <EsqueletoTexto
                        etiqueta='Iteración'
                        mostrar={mostrar}
                        valor={ite.nombre.capitalize()}
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
                        etiqueta='Duración'
                        mostrar={mostrar}
                        valor= {getDays(fechaInicio, fechaFin) + " dias"}
                    />}
                </Fragment>
                }
           
        />
    )
}
