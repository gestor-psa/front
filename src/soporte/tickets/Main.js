import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router";
import List from 'soporte/tickets/List'
import ViewTicket from "soporte/tickets/ViewTicket";

// /tickets
export default () => {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <List/>
            </Route>
            <Route path={`${path}/:id`}>
                <ViewTicket/>
            </Route>
        </Switch>
    )
}
