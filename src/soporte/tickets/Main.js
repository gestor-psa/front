import React from 'react';
import {useRouteMatch} from "react-router";
import Ticket from "soporte/tickets/Ticket";
import CrearTicket from "soporte/tickets/crear/CrearTicket";
import MenuTickets from "soporte/tickets/MenuTickets";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <MenuTickets/>
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
