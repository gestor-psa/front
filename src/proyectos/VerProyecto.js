import React, { useEffect, useState } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import axios from "axios";


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
    const [proyecto, setProyecto] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ id)
            .then(res => {
                console.log(res);
                setProyecto(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id]);

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {proyecto && < Typography variant='h4'>
                                {proyecto.nombre}
                            </Typography> }
                        </Grid>
                    </Grid>
                </Paper>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>

            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
