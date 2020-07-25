import React, {useEffect} from 'react';
import {useParams, useRouteMatch} from "react-router";
import VerTicket from "soporte/tickets/ver/VerTicket";
import axios from "axios";
import ModificarTicket from "soporte/tickets/modificar/ModificarTicket";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";


// /tickets
export default ({ticket, onTicketChange}) => {
    const {id} = useParams();
    const {path} = useRouteMatch() || {};

    useEffect(() => {
        if (!ticket && id) {
            Promise.all([
                axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id),
                // axios.get(process.env.REACT_APP_URL_PROYECTOS + '/tareas',
                //     {params: {ticketId: id}})
            ]).then(([ticketRes, tareasRes]) => {
                // onTicketChange({...ticketRes.data, tareas: tareasRes.data})
                onTicketChange({...ticketRes.data, tareas: []}) // TODO: cambiar cuando proyectos lo arrregle
            })
        }
    }, [ticket, onTicketChange, id]);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <VerTicket ticket={ticket}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarTicket ticket={ticket} onTicketChange={onTicketChange}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
