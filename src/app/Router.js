import React, {useEffect} from "react";
import {Router} from "react-router";
import {createBrowserHistory as createHistory} from "history";


/**
 * Same as BrowserRouter but doesn't push a location if it's the same
 * as the current location.
 */
export default (props) => {
    const history = createHistory(props);
    const prevHistoryPush = history.push;

    useEffect(() => {
        // monkey patching to prevent pushing same url into history stack
        history.push = (pathname, state = {}) => {
            const lastLocation = history.location;
            if (pathname !== lastLocation.pathname + lastLocation.search + lastLocation.hash ||
                JSON.stringify(state) !== JSON.stringify(lastLocation.state || {})
            ) {
                prevHistoryPush(pathname, state)
            }
        };
    }, [prevHistoryPush, history]);

    return (
        <Router history={history} children={props.children}/>
    )
}
