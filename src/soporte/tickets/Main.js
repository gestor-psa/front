import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router";
import ListarTickets from 'soporte/tickets/ListarTickets'
import VerTicket from "soporte/tickets/VerTicket";

// /tickets
export default () => {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <ListarTickets/>
            </Route>
            <Route path={`${path}/:id`}>
                <VerTicket/>
            </Route>
        </Switch>
    )
}
