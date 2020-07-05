import React from 'react';
import {Route, useRouteMatch} from "react-router";
import ListarTickets from 'soporte/tickets/ListarTickets'
import Ticket from "soporte/tickets/Ticket";
import NotFoundSwitch from "components/common/NotFoundSwitch";
import CrearTicket from "soporte/tickets/crear/CrearTicket";

// /tickets
export default () => {
    const {path} = useRouteMatch();

    return (
        <NotFoundSwitch>
            <Route exact path={path}>
                <ListarTickets/>
            </Route>
            <Route path={`${path}/creacion`}>
                <CrearTicket/>
            </Route>
            <Route path={`${path}/:id(\\d+)`}>
                <Ticket/>
            </Route>
        </NotFoundSwitch>
    )
}
