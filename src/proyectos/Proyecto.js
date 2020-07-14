import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '15px',
        marginTop: theme.spacing(3),
        border: '2px solid black',
    },
}));



export default (props) => {
    const classes = useStyles();
    const { path } = useRouteMatch() || {};
    const history = useHistory();

    const pushToOverview = (id) => history.push(`${path}/${id}`);

    return (
        <Fragment>
            <Paper elevation={3} className={classes.paper} onClick={() => pushToOverview(props.proyecto.id)} square={false} variant={"outlined"}>
                <Typography gutterBottom variant="h2" align="left">
                    {props.proyecto.nombre}
                </Typography>
                <Typography variant="body1" align="left">
                    Fecha de Inicio: {props.proyecto.fechaInicio}
                </Typography>
                <Typography variant="body1" align="left">
                    Estado: {props.proyecto.estado}
                </Typography>
            </Paper>
        </Fragment>
    )
}