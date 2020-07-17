import React from "react";
import SeleccionDeGrupo from "proyectos/common/SeleccionDeGrupo";



export default ({onDataChange, proyecto = {}}) => {
   

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

    return (
        <div>
            <SeleccionDeGrupo
                opciones={estados}
                key={proyecto.estado}
                seleccionPorDefecto={proyecto.estado}
                onChange={({valor}) => onDataChange({estado: valor})}
            />
        </div>
    )
}
