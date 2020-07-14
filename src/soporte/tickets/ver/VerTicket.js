import React from "react";
import CamposTicket from "soporte/tickets/ver/CamposTicket";
import Comentarios from "soporte/tickets/ver/Comentarios";
import Acciones from "soporte/tickets/ver/acciones/Acciones";
import Layout from "soporte/common/Layout";


export default ({ticket}) => {
    return (
        <Layout
            titulo='Ver ticket'
            ladoIzquierdo={<CamposTicket mostrar={Boolean(ticket)} {...ticket}/>}
            ladoDerecho={<Comentarios mostrar={Boolean(ticket)}/>}
            fin={<Acciones mostrar={Boolean(ticket)}/>}
        />
    )
}
