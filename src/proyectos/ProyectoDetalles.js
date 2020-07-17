import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    }
}));


export default (props) => {
    const classes = useStyles();
    const proyecto = props.proyecto

    return (
        <Paper className={classes.root}>
        <Grid container spacing={5}>
            <Grid item xs={12} container direction={'column'} spacing = {20}>
                < Typography variant='h4'>
                    {(proyecto && proyecto.nombre) || "Sin Nombre"}
                </Typography>
                < Typography variant='h4'>
                    {"Estado: " + ((proyecto && proyecto.estado) || "sin estado")}
                </Typography>
                < Typography variant='h4'>
                    {"Encargado: " + ((proyecto && proyecto.encargado) || "sin asignar")}
                </Typography>
                < Typography variant='h4'>
                    {"Descripcion: " + ((proyecto && proyecto.descripcion) || "")}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
    )
}