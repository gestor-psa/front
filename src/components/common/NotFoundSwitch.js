import {Route, Switch} from "react-router";
import React from "react";
import NotFound from "views/NotFound";

export default ({children}) => {
    return (
        <Switch>
            {children}
            <Route><NotFound/></Route>
        </Switch>
    )
}
