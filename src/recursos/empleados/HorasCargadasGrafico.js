import {Bar} from 'react-chartjs-2';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



// function aleatorio(min, max) {
    // return Math.floor(Math.random() * (max - min) + min);
//   }
  
function pasarHoras(pos, desde, horasCarg){
    for (let hora in desde){
        if (desde[hora].category === 'proyecto'){
            if (! (desde[hora].taskId in horasCarg)){
                horasCarg[desde[hora].taskId] = [0, 0, 0, 0, 0, 0, 0];
            }
            horasCarg[desde[hora].taskId][pos] += desde[hora].hours;
        } else {
            if (! (desde[hora].category in horasCarg)){
                horasCarg[desde[hora].category] = [0, 0, 0, 0, 0, 0, 0];
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
    let [fechaLunes, setFechaLunes] = useState(new Date());
    let [fechaMartes, setFechaMartes] = useState(new Date());
    let [fechaMiercoles, setFechaMiercoles] = useState(new Date());
    let [fechaJueves, setFechaJueves] = useState(new Date());
    let [fechaViernes, setFechaViernes] = useState(new Date());
    let [fechaSabado, setFechaSabado] = useState(new Date());
    let [fechaDomingo, setFechaDomingo] = useState(new Date());
    const { id } = useParams();
    const history = useHistory();
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    let [state, setState] = useState({
          labels: [
              'Lunes '+ new Date(fechaLunes).getDate(),
              'Martes '+ new Date(fechaMartes).getDate(),
              'Miercoles '+ new Date(fechaMiercoles).getDate(),
              'Jueves '+ new Date(fechaJueves).getDate(),
              'Viernes '+ new Date(fechaViernes).getDate(),
              'Sabado '+ new Date(fechaSabado).getDate(),
              'Domingo '+ new Date(fechaDomingo).getDate()
            ],
          datasets: [],
        })

    const actualizarGrafico = (hl,hma,hmi,hj,hv,hs,hd,fl,fma,fmi,fj,fv,fs,fd) => {
        var horasCargadas = {};
        pasarHoras(0, hl, horasCargadas);
        pasarHoras(1, hma, horasCargadas);
        pasarHoras(2, hmi, horasCargadas);
        pasarHoras(3, hj, horasCargadas);
        pasarHoras(4, hv, horasCargadas);
        pasarHoras(5, hs, horasCargadas);
        pasarHoras(6, hd, horasCargadas);
        var colorActual = 0;
        
        var dataset = []

        for (let categoria in horasCargadas){
            let nombre = categoria;
            if (!isNaN(nombre)){
                nombre = 'Tarea ' + categoria;
            }
            dataset.push({
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
        setState({
            labels: [
                'Lunes '+ new Date(fl).getDate(),
                'Martes '+ new Date(fma).getDate(),
                'Miercoles '+ new Date(fmi).getDate(),
                'Jueves '+ new Date(fj).getDate(),
                'Viernes '+ new Date(fv).getDate(),
                'Sabado '+ new Date(fs).getDate(),
                'Domingo '+ new Date(fd).getDate()
              ],
            datasets: dataset,
          })
    };

    useEffect(() => {

        var hoy = new Date();
        var dia = hoy.getDay();

        
        //Se toma que el primer dia de la semana es el domingo
        var lunes = new Date();
        var corrector = 0;
        if (dia === 0){
            corrector = 7;
        }
        lunes.setDate(hoy.getDate() - dia + 1 - corrector);
        setFechaLunes(lunes);

        //Lunes
        var ddL = String(lunes.getDate()).padStart(2, '0');
        var mmL = String(lunes.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyL = lunes.getFullYear();

        //Martes
        var martes = new Date();
        martes.setDate(hoy.getDate() - dia + 2 - corrector);
        setFechaMartes(martes);
        var ddMa = String(martes.getDate()).padStart(2, '0');
        var mmMa = String(martes.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyMa = martes.getFullYear();

        //Miercoles
        var miercoles = new Date();
        miercoles.setDate(hoy.getDate() - dia + 3 - corrector);
        setFechaMiercoles(miercoles)
        var ddMi = String(miercoles.getDate()).padStart(2, '0');
        var mmMi = String(miercoles.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyMi = miercoles.getFullYear();

        //Jueves
        var jueves = new Date();
        jueves.setDate(hoy.getDate() - dia + 4 - corrector);
        setFechaJueves(jueves)
        var ddJ = String(jueves.getDate()).padStart(2, '0');
        var mmJ = String(jueves.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyJ = jueves.getFullYear();

        // Viernes
        var viernes = new Date();
        viernes.setDate(hoy.getDate() - dia + 5 - corrector);
        setFechaViernes(viernes)
        var ddV = String(viernes.getDate()).padStart(2, '0');
        var mmV = String(viernes.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyV = viernes.getFullYear();

        // Sabado
        var sabado = new Date();
        sabado.setDate(hoy.getDate() - dia + 6 - corrector);
        setFechaSabado(sabado)
        var ddS = String(sabado.getDate()).padStart(2, '0');
        var mmS = String(sabado.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyS = sabado.getFullYear();

        // Domingo
        var domingo = new Date();
        domingo.setDate(hoy.getDate() - dia + 7 - corrector);
        setFechaDomingo(domingo)
        var ddD = String(domingo.getDate()).padStart(2, '0');
        var mmD = String(domingo.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyD = domingo.getFullYear();

        id && axios.all([
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyL + mmL + ddL),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyMa + mmMa + ddMa),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyMi + mmMi + ddMi),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyJ + mmJ + ddJ),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyV + mmV + ddV),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyS + mmS + ddS),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyD + mmD + ddD)

        ])
        .then(axios.spread((data1,data2,data3,data4,data5,data6,data7) => {
            actualizarGrafico(data1.data,data2.data,data3.data,data4.data,data5.data,data6.data,data7.data,
                lunes,martes,miercoles,jueves,viernes,sabado,domingo);
        }))
        .catch(error => {
            // TODO.
        });
        

    }, [id]);

    

    const cambiarSemana = (n) => {
        if (new Date(new Date(fechaDomingo).setDate(new Date(fechaDomingo).getDate() + 1)).getMonth() > new Date().getMonth() && n === 1){
            return;
        }
        let fLunes = new Date(fechaLunes).setDate(new Date(fechaLunes).getDate() + 7*n);
        let fMartes = new Date(fechaMartes).setDate(new Date(fechaMartes).getDate() + 7*n);
        let fMiercoles = new Date(fechaMiercoles).setDate(new Date(fechaMiercoles).getDate() + 7*n);
        let fJueves = new Date(fechaJueves).setDate(new Date(fechaJueves).getDate() + 7*n);
        let fViernes = new Date(fechaViernes).setDate(new Date(fechaViernes).getDate() + 7*n);
        let fSabado = new Date(fechaSabado).setDate(new Date(fechaSabado).getDate() + 7*n);
        let fDomingo = new Date(fechaDomingo).setDate(new Date(fechaDomingo).getDate() + 7*n);
        setFechaLunes(fLunes);
        setFechaMartes(fMartes);
        setFechaMiercoles(fMiercoles);
        setFechaJueves(fJueves);
        setFechaViernes(fViernes);
        setFechaSabado(fSabado);
        setFechaDomingo(fDomingo);
        // setFechaSabado(new Date(fechaSabado).setDate(new Date(fechaSabado).getDate() + 7*n));
        // setFechaDomingo(new Date(fechaDomingo).setDate(new Date(fechaDomingo).getDate() + 7*n));
        
       
        //Lunes
        var ddL = String(new Date(fLunes).getDate()).padStart(2, '0');
        var mmL = String(new Date(fLunes).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyL = new Date(fLunes).getFullYear();

        //Martes
        var ddMa = String(new Date(fMartes).getDate()).padStart(2, '0');
        var mmMa = String(new Date(fMartes).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyMa = new Date(fMartes).getFullYear();

        //Miercoles
        var ddMi = String(new Date(fMiercoles).getDate()).padStart(2, '0');
        var mmMi = String(new Date(fMiercoles).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyMi = new Date(fMiercoles).getFullYear();

        //Jueves
        var ddJ = String(new Date(fJueves).getDate()).padStart(2, '0');
        var mmJ = String(new Date(fJueves).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyJ = new Date(fJueves).getFullYear();

        // Viernes
        var ddV = String(new Date(fViernes).getDate()).padStart(2, '0');
        var mmV = String(new Date(fViernes).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyV = new Date(fViernes).getFullYear();

        // Sabado
        var ddS = String(new Date(fSabado).getDate()).padStart(2, '0');
        var mmS = String(new Date(fSabado).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyS = new Date(fSabado).getFullYear();

        // Domingo
        var ddD = String(new Date(fDomingo).getDate()).padStart(2, '0');
        var mmD = String(new Date(fDomingo).getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyyD = new Date(fDomingo).getFullYear();

        id && axios.all([
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyL + mmL + ddL),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyMa + mmMa + ddMa),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyMi + mmMi + ddMi),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyJ + mmJ + ddJ),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyV + mmV + ddV),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyS + mmS + ddS),
            axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/day/' + yyyyD + mmD + ddD)

        ])
        .then(axios.spread((data1,data2,data3,data4,data5,data6,data7) => {
            actualizarGrafico(data1.data,data2.data,data3.data,data4.data,data5.data,data6.data,data7.data,
                fLunes,fMartes,fMiercoles,fJueves,fViernes,fSabado,fDomingo);
        }))
        .catch(error => {
            // TODO.
        });

    }


    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <ArrowBackIcon style={{color:"1fc71f"}} fontSize="large" onClick={() => {history.push('/recursos/'+id) }}/>
                </Grid>
                <Grid item container xs={12} justify={'center'}>
                    <Typography variant='h4'>
                        {'Horas cargadas - ' + meses[new Date(fechaLunes).getMonth()] + ' '+ (new Date().getFullYear()).toString()}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{maxHeight:'100%',marginTop:'20px'}} justify={'center'} alignItems={'center'}>
                    <ArrowBackIosIcon style = {{verticalAlign:"top", display: "inline"}} onClick={()=>{cambiarSemana(-1)}}/>
                    <div style = {{width:"95%",display:"inline-block"}}>
                    <Bar style = {{display: "inline",width:"50%"}}
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
                    </div>
                    <ArrowForwardIosIcon style = {{verticalAlign:"top", display: "inline"}}onClick={()=>{cambiarSemana(1)}}/>
                </Grid>
            </Grid>
        </Paper>
    );
}
