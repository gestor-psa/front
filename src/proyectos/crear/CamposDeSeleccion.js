import React from "react";
import SeleccionDeGrupo from "proyectos/common/SeleccionDeGrupo";



export default ({onDataChange, proyecto, mostrarAsignacion, isPrioridad, titulo, errors, register}) => {
    const estados = [
        {
            etiqueta: 'En Progreso',
            valor: 'en progreso'
        }, {
            etiqueta: 'Finalizado',
            valor: 'finalizado'
        }, {
            etiqueta: 'Detenido',
            valor: 'detenido'
        }, {
            etiqueta: 'Cancelado',
            valor: 'cancelado'
        }
    ];

    const prioridades = [
        {
            etiqueta: 'Alta',
            valor: 'alta'
        }, {
            etiqueta: 'Media',
            valor: 'media'
        }, {
            etiqueta: 'Baja',
            valor: 'baja'
        }
    ];

    const getPair = (valor) =>{
        if (!isPrioridad){
            return {estado: valor}
        } else {
            return {prioridad: valor}      
        }
    }

    return (
        <div>
            <SeleccionDeGrupo
                errors = {errors}
                register = {register}
                titulo = {titulo}
                opciones={(!isPrioridad && estados) || prioridades}
                key={(!isPrioridad && proyecto.estado) || proyecto.prioridad}
                seleccionPorDefecto={(!isPrioridad && proyecto.estado) || proyecto.prioridad}
                onChange={({valor}) => onDataChange(getPair(valor))}
            />
        </div>
    )
}
