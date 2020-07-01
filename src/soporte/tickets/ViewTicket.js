import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Moment from "react-moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
    },
    campoWrapper: {
        margin: theme.spacing(1, 0)
    },
    campo: {
        display: 'inline'
    },
    descriptor: {
        fontWeight: 600
    },
    campoComentario: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    agregarComentarioWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    agregarComentario: {
        marginTop: theme.spacing(2)
    },
    accionesWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    },
    acciones: {
        margin: theme.spacing(0, 2)
    },
    eliminar: {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    escalar: {
        background: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        }
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
            {ticket &&
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Ver ticket
                        </Typography>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={6}>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Nombre:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.nombre}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Descripción:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.descripcion}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Responsable:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.responsable}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Tipo:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.tipo.capitalize()}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Severidad:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.severidad.capitalize()}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Estado:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    {ticket.estado.capitalize()}
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Fecha de creación:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    <Moment date={ticket.fechaDeCreacion} local format="DD/MM/YYYY HH:mm"/>
                                </Typography>
                            </div>
                            <div className={classes.campoWrapper}>
                                <Typography className={`${classes.campo} ${classes.descriptor}`}>
                                    Fecha de actualización:&nbsp;
                                </Typography>
                                <Typography className={classes.campo}>
                                    <Moment date={ticket.fechaDeActualizacion} local format="DD/MM/YYYY HH:mm"/>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6'>
                                Comentarios:
                            </Typography>
                            <Typography>
                                Aún no hay comentarios
                            </Typography>
                            <TextField
                                label="Nuevo comentario"
                                multiline
                                rowsMax={4}
                                color="secondary"
                                className={classes.campoComentario}
                                // value={value}
                                // onChange={handleChange}
                            />
                            <div className={classes.agregarComentarioWrapper}>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    className={classes.agregarComentario}
                                >
                                    Agregar comentario
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.accionesWrapper}>
                        <Button
                            variant="contained"
                            className={`${classes.acciones} ${classes.eliminar}`}
                        >
                            Eliminar
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            className={`${classes.acciones} ${classes.escalar}`}
                        >
                            Escalar a desarrollo
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            className={classes.acciones}
                        >
                            Modificar
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            className={classes.acciones}
                        >
                            Volver
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            }
        </Fragment>
    )
}
