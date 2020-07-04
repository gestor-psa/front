import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CamposTicket from "soporte/tickets/CamposTicket";
import Comentarios from "soporte/tickets/Comentarios";
import Acciones from "soporte/tickets/Acciones";
import {useMediaQuery} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    }
}));

export default () => {
    const {id} = useParams();
    const [ticket, setTicket] = useState();
    const classes = useStyles();
    const isMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then(res => {
                setTicket(res.data);
            })
    }, [id]);

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Ver ticket
                        </Typography>
                    </Grid>
                    <Grid item container spacing={isMd ? 6 : 2} xs={12}>
                        <Grid item xs={12} md={6}>
                            <CamposTicket mostrar={Boolean(ticket)} {...ticket}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Comentarios mostrar={Boolean(ticket)}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Acciones mostrar={Boolean(ticket)}/>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )
}
