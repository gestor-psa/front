import React, { useEffect, useState } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useParams, useHistory} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import "react-datepicker/dist/react-datepicker.css";
import CartelCargaHora from "recursos/empleados/CartelCargaHora"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import "./estilos.css";

// /empleados
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        },
        flexGrow: 1,
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
const parseFecha = (fecha) => {
    let month = '' + (fecha.getMonth() + 1);
    let day = '' + fecha.getDate();
    let year = fecha.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return parseInt(year+month+day,10);
}

const numeroLunes = () => {
    switch (new Date().getDay()){
        case 0:
            return new Date().getDate() + 1;
        case 1:
            return new Date().getDate() + 0;
        case 2:
            return new Date().getDate() - 1;
        case 3:
            return new Date().getDate() - 2;
        case 4:
            return new Date().getDate() - 3;
        case 5:
            return new Date().getDate() - 4;
        case 6:
            return new Date().getDate() - 5;
        default:
            return 0;
    }
}
const numeroMartes = () => {
    let numeroDiaMartes = numeroLunes() + 1;
    return numeroDiaMartes;
}
const numeroMiercoles = () => {
    let numeroDiaMiercoles = numeroLunes() + 2;
    return numeroDiaMiercoles;
}
const numeroJueves = () => {
    let numeroDiaJueves = numeroLunes() + 3;
    return numeroDiaJueves;
}
const numeroViernes = () => {
    let numeroDiaViernes = numeroLunes() + 4;
    return numeroDiaViernes ;
}

export default () => {
    const classes = useStyles();
    // const [startDate, setStartDate] = useState(new Date());
    const { path } = useRouteMatch() || {};
    const { id } = useParams();
    const [dni, setDni] = useState();
    const [proyectos, setProyectos] = useState();
    const history = useHistory();
    let [fechaLunes, setFechaLunes] = useState(new Date());
    let [fechaMartes, setFechaMartes] = useState(new Date());
    let [fechaMiercoles, setFechaMiercoles] = useState(new Date());
    let [fechaJueves, setFechaJueves] = useState(new Date());
    let [fechaViernes, setFechaViernes] = useState(new Date());

    useEffect(() => {
        setDni(id);
        id && axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos')
            .then(res => {
                setProyectos(res.data);
                console.log(res.data);
            })
        
        setFechaLunes(new Date().setDate(numeroLunes()));     
        setFechaMartes(new Date().setDate(numeroMartes()));
        setFechaMiercoles(new Date().setDate(numeroMiercoles()));
        setFechaJueves(new Date().setDate(numeroJueves()));
        setFechaViernes(new Date().setDate(numeroViernes()));
    }, [id]);
    
    

    const cambiarSemana = (n) => {
        if (new Date(new Date(fechaLunes).setDate(new Date(fechaLunes).getDate() - 1)).getMonth() < new Date().getMonth() && n === -1){
            return;
        }
        if (new Date(new Date(fechaViernes).setDate(new Date(fechaViernes).getDate() + 1)).getMonth() > new Date().getMonth() && n === 1){
            return;
        }
        setFechaLunes(new Date(fechaLunes).setDate(new Date(fechaLunes).getDate() + 7*n));
        setFechaMartes(new Date(fechaMartes).setDate(new Date(fechaMartes).getDate() + 7*n));
        setFechaMiercoles(new Date(fechaMiercoles).setDate(new Date(fechaMiercoles).getDate() + 7*n));
        setFechaJueves(new Date(fechaJueves).setDate(new Date(fechaJueves).getDate() + 7*n));
        setFechaViernes(new Date(fechaViernes).setDate(new Date(fechaViernes).getDate() + 7*n));
    }

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Cargar hora
                    </Typography>
                        </Grid>
                        {<Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            <ArrowBackIosIcon onClick={()=>{cambiarSemana(-1)}}/>

                            <CartelCargaHora esHoy = {parseFecha(new Date(fechaLunes)) === parseFecha(new Date())} desactivado={new Date(fechaLunes).getMonth() !== new Date().getMonth()} dni={dni} proyectos={proyectos} dia="Lunes" nroDia={new Date(fechaLunes).getDate()}/>
                            <CartelCargaHora esHoy = {parseFecha(new Date(fechaMartes)) === parseFecha(new Date())} desactivado={new Date(fechaMartes).getMonth() !== new Date().getMonth()} dni={dni} proyectos={proyectos} dia="Martes" nroDia={new Date(fechaMartes).getDate()}/>
                            <CartelCargaHora esHoy = {parseFecha(new Date(fechaMiercoles)) === parseFecha(new Date())} desactivado={new Date(fechaMiercoles).getMonth() !== new Date().getMonth()} dni={dni} proyectos={proyectos} dia="Miércoles" nroDia={new Date(fechaMiercoles).getDate()}/>
                            <CartelCargaHora esHoy = {parseFecha(new Date(fechaJueves)) === parseFecha(new Date())} desactivado={new Date(fechaJueves).getMonth() !== new Date().getMonth()} dni={dni} proyectos={proyectos} dia="Jueves" nroDia={new Date(fechaJueves).getDate()}/>
                            <CartelCargaHora esHoy = {parseFecha(new Date(fechaViernes)) === parseFecha(new Date())} desactivado={new Date(fechaViernes).getMonth() !== new Date().getMonth()} dni={dni} proyectos={proyectos} dia="Viernes" nroDia={new Date(fechaViernes).getDate()}/>
                            <ArrowForwardIosIcon onClick={()=>{cambiarSemana(1)}}/>
                            <div className={classes.nuevoEmpleado}>
                                    <Button  style={{marginBottom:"20px", marginLeft:"40px", color: "red"}}onClick={() => {history.push('/recursos/'+id) }} color='error' variant='outlined' >
                                        Cancelar
                                    </Button>
                                </div>
                        </Grid>}

                    </Grid>
                </Paper>
            </AnimatedRoute>
            
        </AnimatedSwitch>
    )
}