import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CamposTicket from "soporte/tickets/CamposTicket";
import AgregarComentario from "soporte/tickets/AgregarComentario";
import Acciones from "soporte/tickets/Acciones";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
    }
}));

export default () => {
    const {id} = useParams();
    const [ticket, setTicket] = useState();
    const classes = useStyles();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then(res => {
                setTicket(res.data);
            })
            .catch(error => {
                // TODO.
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
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={6}>
                            <CamposTicket mostrar={ticket == null} {...ticket}/>
                        </Grid>
                        <Grid item xs={6}>
                            <AgregarComentario/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Acciones/>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )
}
