import React from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {Route, Switch, useRouteMatch} from "react-router";
import TicketsMain from "soporte/tickets/Main";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
        }
    }
}));

export default () => {
    const classes = useStyles();
    const { path, url } = useRouteMatch();

    return (
        <ContentWrapper>
            <Switch>
                <Route exact path={path}>
                    <Paper className={classes.paper}>
                        <div>
                            <Link to={`${url}/tickets`}>Tickets</Link>
                        </div>
                        <br/>
                        <div>
                            <Link to={`${url}/clientes`}>Clientes</Link>
                        </div>
                    </Paper>
                </Route>
                <Route path={`${path}/tickets`}>
                    <TicketsMain/>
                </Route>
                <Route path={`${path}/clientes`}>
                    <div>Clientes</div>
                </Route>
            </Switch>
        </ContentWrapper>
    )
}
