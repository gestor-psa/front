import React from 'react';
import Layout from "soporte/common/Layout";
import DatosPersonales from "soporte/clientes/ver/DatosPersonales";
import DatosInternos from "soporte/clientes/ver/DatosInternos";
import Acciones from "soporte/clientes/ver/acciones/Acciones";


export default ({cliente}) => {

    return (
        <Layout
            titulo='Ver cliente'
            backUrl={'/soporte/clientes'}
            ladoIzquierdo={<DatosPersonales mostrar={Boolean(cliente)} {...cliente}/>}
            ladoDerecho={<DatosInternos mostrar={Boolean(cliente)} {...cliente}/>}
            fin={<Acciones mostrar={Boolean(cliente)}/>}
        />
    )
}
