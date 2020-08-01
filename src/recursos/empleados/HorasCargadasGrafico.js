import {Bar} from 'react-chartjs-2';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";



// function aleatorio(min, max) {
    // return Math.floor(Math.random() * (max - min) + min);
//   }
  
function pasarHoras(pos, desde, horasCarg){
    for (let hora in desde){
        if (desde[hora].category === 'proyecto'){
            if (! (desde[hora].taskId in horasCarg)){
                horasCarg[desde[hora].taskId] = [0, 0, 0, 0, 0];
            }
            horasCarg[desde[hora].taskId][pos] += desde[hora].hours;
        } else {
            if (! (desde[hora].category in horasCarg)){
                horasCarg[desde[hora].category] = [0, 0, 0, 0, 0];
            }
            horasCarg[desde[hora].category][pos] += desde[hora].hours;
        }
    }
}

const colores = [
    'rgba(84,153,199,1)',
    'rgba(231,76,60,1)',
    'rgba(26,188,156,1)',
    'rgba(243,156,18,1)',
    'rgba(52,73,94,1)',
    'rgba(144,148,151,1)',
    'rgba(241,196,15,1)'
]
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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
    const [horasLunes, setHorasLunes] = useState();
    const [horasMartes, setHorasMartes] = useState();
    const [horasMiercoles, setHorasMiercoles] = useState();
    const [horasJueves, setHorasJueves] = useState();
    const [horasViernes, setHorasViernes] = useState();
    const { id } = useParams();
    const history = useHistory();
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    const state = {
          labels: [
              'Lunes '+ new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +1)).getDate(),
              'Martes '+ new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +2)).getDate(),
              'Miercoles '+ new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +3)).getDate(),
              'Jueves '+ new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +4)).getDate(),
              'Viernes '+ new Date(new Date().setDate(new Date().getDate() - new Date().getDay() +5)).getDate()
            ],
          datasets: [],
        }


    useEffect(() => {

        console.log("ID !!!!!!!!!!!!!!!!");
        console.log(id);

        var hoy = new Date();
        var dia = hoy.getDay();

        
        //Se toma que el primer dia de la semana es el domingo
        var lunes = new Date();
        lunes.setDate(hoy.getDate() - dia + 1);

        //Lunes
        var dd = String(lunes.getDate()).padStart(2, '0');
        var mm = String(lunes.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = lunes.getFullYear();


        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasLunes(res.data);
            })
            .catch(error => {
                // TODO.
            }); 
        

        //Martes
        var martes = new Date();
        martes.setDate(hoy.getDate() - dia + 2);
        dd = String(martes.getDate()).padStart(2, '0');
        mm = String(martes.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = martes.getFullYear();

        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasMartes(res.data);
            })
            .catch(error => {
                // TODO.
            });

        //Miercoles
        var miercoles = new Date();
        miercoles.setDate(hoy.getDate() - dia + 3);
        dd = String(miercoles.getDate()).padStart(2, '0');
        mm = String(miercoles.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = miercoles.getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasMiercoles(res.data);
            })
            .catch(error => {
                // TODO.
            });

        //Jueves
        var jueves = new Date();
        jueves.setDate(hoy.getDate() - dia + 4);
        dd = String(jueves.getDate()).padStart(2, '0');
        mm = String(jueves.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = jueves.getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasJueves(res.data);
            })
            .catch(error => {
                // TODO.
            });


        // Viernes
        var viernes = new Date();
        viernes.setDate(hoy.getDate() - dia + 5);
        dd = String(viernes.getDate()).padStart(2, '0');
        mm = String(viernes.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = viernes.getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasViernes(res.data);
            })
            .catch(error => {
                // TODO.
            });

    }, [id]);


    var horasCargadas = {};    

    console.log(horasLunes);
    console.log(horasMartes);
    console.log(horasMiercoles);
    console.log(horasJueves);
    console.log(horasViernes);



    pasarHoras(0, horasLunes, horasCargadas);
    pasarHoras(1, horasMartes, horasCargadas);
    pasarHoras(2, horasMiercoles, horasCargadas);
    pasarHoras(3, horasJueves, horasCargadas);
    pasarHoras(4, horasViernes, horasCargadas);

    var colorActual = 0;

    for (let categoria in horasCargadas){
        let nombre = categoria;
        if (!isNaN(nombre)){
            nombre = 'Tarea ' + categoria;
        }
        state['datasets'].push({
            label: nombre,
            backgroundColor: colores[colorActual],
            data: horasCargadas[categoria],
            borderWidth: {top:10},
            borderColor: 'rgba(250,250,250,1)',
            hoverBorderColor: 'rgba(250,250,250,1)',
            hoverBorderWidth: 11,

        });
        colorActual += 1;
    }

    console.log("State: !!!!!!!!!!!!");
    console.log(state);

    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <ArrowBackIcon style={{color:"1fc71f"}} fontSize="large" onClick={() => {history.push('/recursos/'+id) }}/>
                </Grid>
                <Grid item container xs={12} justify={'center'}>
                    <Typography variant='h4'>
                        {'Horas cargadas - ' + meses[new Date().getMonth()] + ' '+ (new Date().getFullYear()).toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{maxHeight:'100%',marginTop:'20px'}}>
                    <Bar
                        data={state}
                        options={{
                            legend:{
                            display:false,
                            position:'right'
                            },
                            scales: {
                                xAxes: [{ stacked: true }],
                                yAxes: [{ 
                                    display: false,
                                    stacked: true }]
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
