import React, {useEffect, useState, Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Card from '@material-ui/core/Card';


function pasarHoras(pos, desde, horasCarg){
    for (let hora in desde){
        horasCarg[pos] += desde[hora].hours;
    }
}

function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const colores = [
    '#8484D9', '#f7764f', '#FF5858', '#fdfd96', '#4646C7', '#5A5ACD', '#6F6FD3'
]

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 0.5),
       
        flexGrow: 1,
    },
    soporte: {
        padding: theme.spacing(3, 1),
       
        flexGrow: 1,
        backgroundColor: colores[3]
    },
    fueraOficina: {
        padding: theme.spacing(3, 1),
        
        flexGrow: 1,
        backgroundColor: colores[1]
    },
    estudio: {
        padding: theme.spacing(3, 1),
        
        flexGrow: 1,
        backgroundColor: colores[2]
    },
    tarea: {
        padding: theme.spacing(3, 1),
        
        flexGrow: 1,
        backgroundColor: colores[0]
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    },

    nuevoEmpleado: {
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const crearFecha = (dia) => {
    let fecha = new Date();
    let month = String(fecha.getMonth() + 1).padStart(2, '0');
    let day = String(dia).padStart(2, '0');
    let year = fecha.getFullYear();
    console.log(year+month+day,10);
    return parseInt(year+month+day,10);
}


export default (props) => {
    const classes = useStyles();
    const [horasDiaActual, setHorasDiaActual] = useState();
    var horasCargadas = [0];

    useEffect(() => {
        props.dni && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + props.dni + '/day/' + crearFecha(props.nroDia))
            .then(res => {
                console.log(res)
                setHorasDiaActual(res.data);
            })
            .catch(error => {
                // TODO.
        }); 
    }, [props.dni, props.nroDia]);

    pasarHoras(0,horasDiaActual,horasCargadas);
    console.log(props.horasDia);

    return (
        <Grid item container xs justify="center" alignItems="center">
        <Fragment>
            <Card className={classes.root} raised={true}>
                <Grid item container spacing={2} xs direction="column" justify="center" alignItems="center">
                    <Grid item xs>
                        <Typography variant="h5" component="h2" align='center'style={{color:props.esHoy?"red":"black"}}>
                            {props.dia}
                        </Typography>
                        <Typography variant="h5" component="h2" align='center' style={{color:props.esHoy?"red":"black"}}>
                            {props.nroDia}
                        </Typography>
                    </Grid>
                    {props.horasDia && props.horasDia.map(categoria => (
                        (categoria[1] > 0)?
                            (categoria[0] === 'soporte')?
                                <Grid item xs style={{marginLeft:'5%'}}>
                                    <Card className={classes.soporte} raised={true}>
                                        <Typography variant="h6" align='center'>
                                        {Capitalize(categoria[0])}
                                        </Typography>
                                        <Typography variant="body1" align='center'>
                                        {categoria[1] + ' horas'}
                                        </Typography>
                                    </Card>
                                </Grid>
                            :(categoria[0] === 'fuera de oficina')?
                            <Grid item xs style={{marginLeft:'5%'}}>
                                <Card className={classes.fueraOficina} raised={true}>
                                    <Typography variant="h6" align='center'>
                                    {Capitalize(categoria[0])}
                                    </Typography>
                                    <Typography variant="body1" align='center'>
                                    {categoria[1] + ' horas'}
                                    </Typography>
                                </Card>
                            </Grid>
                            :(categoria[0] === 'estudio')?
                            <Grid item xs style={{marginLeft:'5%'}}>
                                <Card className={classes.estudio} raised={true}>
                                    <Typography variant="h6" align='center'>
                                    {Capitalize(categoria[0])}
                                    </Typography>
                                    <Typography variant="body1" align='center'>
                                    {categoria[1] + ' horas'}
                                    </Typography>
                                </Card>
                            </Grid>
                            :<Grid item xs style={{marginLeft:'5%'}}>
                            <Card className={classes.tarea} raised={true}>
                                <Typography variant="h6" align='center'>
                                {'Tarea # ' + Capitalize(categoria[0])}
                                </Typography>
                                <Typography variant="body1" align='center'>
                                {categoria[1] + ' horas'}
                                </Typography>
                            </Card>
                        </Grid>
                        : null
                    ))}
                    
                </Grid>
            </Card>
        </Fragment>
        </Grid>
    )
}