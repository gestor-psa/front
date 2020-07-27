import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '15px',
        marginTop: theme.spacing(3),
        border: '2px solid black',
    },
}));



export default (props) => {
    const classes = useStyles();
    const history = useHistory();
    const responsableDni = props.proyecto.responsableDni
    const [responsable, setResponsable] = useState();

    const pushToOverview = (id) => {history.push(`${history.location.pathname}/`+id);};
    React.useEffect(() => {
        if (responsableDni) {
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + responsableDni)
                .then(res =>{ setResponsable(res.data);})
        }
    }, [responsableDni]);

    return (
        <Fragment>
            <Paper elevation={3} className={classes.paper} onClick={() => pushToOverview(props.proyecto.id)} square={false} variant={"outlined"}>
                <Typography gutterBottom variant="h2" align="left">
                    {props.proyecto.nombre}
                </Typography>
                {<Typography variant="body1" align="left">
                    Encargado: {(responsable && (responsable.name+" "+ responsable.surname)) || "Sin Asignar"}
                </Typography>}
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