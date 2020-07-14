import React from 'react';
import {useRouteMatch} from "react-router";
import Ticket from "soporte/tickets/Ticket";
import CrearTicket from "soporte/tickets/crear/CrearTicket";
import Tickets from "soporte/tickets/listar/Tickets";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Tickets/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/creacion`}>
                <CrearTicket/>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Ticket/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
