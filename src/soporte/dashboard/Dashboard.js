import Paper from "@material-ui/core/Paper";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {useRouteMatch} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import TicketsPendientes from "soporte/dashboard/TicketsPendientes";
import TicketsAbiertosYCerrados from "soporte/dashboard/TicketsAbiertosYCerrados";
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
        }
    },
    linksWrapper: {
        marginBottom: theme.spacing(2)
    },
    link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reporte: {
        padding: theme.spacing(2)
    },
    ticketsPendientes: {
        marginTop: theme.spacing(2)
    },
    icon: {
        fontSize: '1.85rem',
        marginLeft: theme.spacing(0.5)
    }
}));

export default () => {
    const classes = useStyles();
    const {url} = useRouteMatch() || {};

    return (
        <div className={classes.paper}>
            <Grid container className={classes.linksWrapper}>
                <Grid item xs={12} sm={6} className={classes.link}>
                    <MuiLink
                        variant='h4'
                        color='secondary'
                        component={RouterLink}
                        to={`${url}/tickets`}
                    >
                        Tickets
                    </MuiLink>
                    <ArrowForwardIosRoundedIcon
                        className={classes.icon}
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.link}>
                    <MuiLink
                        variant='h4'
                        color='secondary'
                        component={RouterLink}
                        to={`${url}/clientes`}
                    >
                        Clientes
                    </MuiLink>
                    <ArrowForwardIosRoundedIcon
                        className={classes.icon}
                        color="secondary"
                    />
                </Grid>
            </Grid>
            <Paper className={classes.reporte}>
                <TicketsAbiertosYCerrados/>
            </Paper>
            <div className={classes.ticketsPendientes}>
                <Paper className={classes.reporte}>
                    <TicketsPendientes/>
                </Paper>
            </div>
        </div>
    )
}
