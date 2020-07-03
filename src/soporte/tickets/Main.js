import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router";
import List from 'soporte/tickets/List'
import VerTicket from "soporte/tickets/VerTicket";

// /tickets
export default () => {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <List/>
            </Route>
            <Route path={`${path}/:id`}>
                <VerTicket/>
            </Route>
        </Switch>
    )
}
