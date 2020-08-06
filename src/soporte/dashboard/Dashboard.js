import Paper from "@material-ui/core/Paper";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {useRouteMatch} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import TicketsPendientes from "soporte/dashboard/TicketsPendientes";
import TicketsAbiertosYCerrados from "soporte/dashboard/TicketsAbiertosYCerrados";
import MuiLink from "@material-ui/core/Link";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
        }
    },
    linkTicket: {
        marginBottom: theme.spacing(2)
    },
    linkCliente: {
        marginTop: theme.spacing(4)
    },
    ticketsPendientes: {
        marginTop: theme.spacing(2)
    }
}));

export default () => {
    const classes = useStyles();
    const {url} = useRouteMatch() || {};

    return (
        <Paper className={classes.paper}>
            <div className={classes.linkTicket}>
                <MuiLink
                    variant='h4'
                    color='secondary'
                    component={RouterLink}
                    to={`${url}/tickets`}
                >
                    Tickets
                </MuiLink>
            </div>
            <TicketsAbiertosYCerrados/>
            <div className={classes.ticketsPendientes}>
                <TicketsPendientes/>
            </div>
            <div className={classes.linkCliente}>
                <MuiLink
                    variant='h4'
                    color='secondary'
                    component={RouterLink}
                    to={`${url}/clientes`}
                >
                    Clientes
                </MuiLink>
            </div>
        </Paper>
    )
}
