import React, {useState} from 'react';
import {useRouteMatch} from "react-router";
import Ticket from "soporte/tickets/Ticket";
import CrearTicket from "soporte/tickets/crear/CrearTicket";
import Tickets from "soporte/tickets/listar/Tickets";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default () => {
    const {path} = useRouteMatch() || {};
    const [ticket, setTicket] = useState();
    const onTicketChange = t => setTicket(t);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Tickets/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/creacion`}>
                <CrearTicket onTicketChange={onTicketChange}/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Ticket ticket={ticket} onTicketChange={onTicketChange}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
