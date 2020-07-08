import React, { useEffect, useState, Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useRouteMatch } from "react-router";
import axios from "axios";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /empleados
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    }
}));
export default () => {
    const classes = useStyles();
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const [empleado, setEmpleado] = useState();

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + id)
            .then(res => {
                setEmpleado(res.data);
            })
        // setEmpleado({"dni":41204123,"name":"Ignacio","surname":"Nitz","organization_id":"100710","pos":"Jefe","date_birth":19900425,"date_hired":20100427});
    }, [id]);

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Ver Empleado
                    </Typography>
                        </Grid>
                        <Grid item container spacing={6} xs={12}>
                            <Grid item xs={12} md={6}>
                                {empleado && <Fragment>
                                    <Typography>
                                        DNI: {empleado.dni}
                                    </Typography>
                                    <Typography>
                                        Nombre y apellido: {empleado.name + " " + empleado.surname}
                                    </Typography>
                                    <Typography>
                                        Fecha de nacimiento: {empleado.date_birth}
                                    </Typography>
                                    <Typography>
                                        Legajo: {empleado.organization_id}
                                    </Typography>
                                    <Typography>
                                        Fecha de contratación: {empleado.date_hire}
                                    </Typography>
                                    <Typography>
                                        Puesto: {empleado.pos}
                                    </Typography>
                                </Fragment>}
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
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>

            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
