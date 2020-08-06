import React, {Fragment} from "react";
import EsqueletoTexto from "soporte/common/EsqueletoTexto";
import EsqueletoMultilinea from "soporte/common/EsqueletoMultilinea";
import axios from "axios";
import Layout from "proyectos/common/Layout";

export default (
    {
        esProyecto, faseId, iteracionId, isTarea, type,
        mostrar, nombre, descripcion, initValuesSetter,
        responsableDni, estado, fechaInicio, fechaFin
    }) => {
    const [responsable, setResponsable] = React.useState(false);
    const [fase, setFase] = React.useState(false);
    const [ite, setIte] = React.useState(false);
    
    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ 
                    setResponsable(res.data);
                    //{initValuesSetter && initValuesSetter.responsable(res.data)}
                })
        } else {
            setResponsable(false)
        }

        if (isTarea && faseId && iteracionId){
            axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + isTarea.id + "/fases/" + faseId)
            .then(res =>{ 
                setFase(res.data);
                //{initValuesSetter && initValuesSetter.fase(res.data)}
            });
            axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + isTarea.id + "/fases/" + faseId + "/iteraciones/"+iteracionId)
            .then(res =>{ 
                setIte(res.data);
               //{initValuesSetter && initValuesSetter.iteracion(res.data)}
            });
        }else {
            setFase({nombre : "Sin asignar"});
            setIte({nombre : "Sin asignar"});
        }
        
    }, [responsableDni, faseId, iteracionId, isTarea, initValuesSetter]);

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
                        valor={(fase && fase.nombre.capitalize()) || "Sin asignar"}
                    />}
                    {isTarea && <EsqueletoTexto
                        etiqueta='Iteración'
                        mostrar={mostrar}
                        valor={(ite && ite.nombre.capitalize()) || "Sin asignar"}
                    />}
                </Fragment> 
                }
                ladoDerecho = {
                <Fragment>{ 
                <EsqueletoTexto
                    etiqueta='Fecha de inicio'
                    mostrar={mostrar}
                    valor={fechaInicio || "Sin Fecha"}
                    />}
                    { <EsqueletoTexto
                        etiqueta='Fecha de finalización'
                        mostrar={mostrar}
                        valor={fechaFin || "Sin fecha"}
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
