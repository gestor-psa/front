import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CamposEmpleado from "recursos/empleados/CamposEmpleado";
// import Acciones from "soporte/tickets/Acciones";
import {useMediaQuery} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    }
}));

export default ({empleado}) => {
    const classes = useStyles();
    const isMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    return (
        <Paper className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h4'>
                        Ver Empleado
                    </Typography>
                </Grid>
                <Grid item container spacing={isMd ? 6 : 2} xs={12}>
                    <Grid item xs={12} md={6}>
                        <CamposEmpleado mostrar={Boolean(empleado)} {...empleado}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <Comentarios mostrar={Boolean(ticket)}/> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {/* <Acciones mostrar={Boolean(ticket)}/> */}
                </Grid>
            </Grid>
        </Paper>
    )
}
