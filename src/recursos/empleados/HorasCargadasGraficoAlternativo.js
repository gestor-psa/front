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
import CartelHorasCargadas from "recursos/empleados/CartelHorasCargadas"
import HorasCargadas from "recursos/empleados/HorasCargadas"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';

// function aleatorio(min, max) {
    // return Math.floor(Math.random() * (max - min) + min);
//   }

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

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    },
    card: {
        padding: theme.spacing(4, 4),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        },
        flexGrow: 1,
    },
    
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
    let [horasCargadasPorDia, setHorasCargadasPorDia] = useState();
    const [state, setState] = React.useState({
        checkedA: false,
      })
    
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

    const actualizarGrafico = (hl,hma,hmi,hj,hv,hs,hd,fl,fma,fmi,fj,fv,fs,fd) => {
        var horasCargadas = {};
        var auxHorasCargadasPorDia = [{},{},{},{},{},{},{}];
        pasarHoras(0, hl, horasCargadas);
        pasarHoras(1, hma, horasCargadas);
        pasarHoras(2, hmi, horasCargadas);
        pasarHoras(3, hj, horasCargadas);
        pasarHoras(4, hv, horasCargadas);
        pasarHoras(5, hs, horasCargadas);
        pasarHoras(6, hd, horasCargadas);

        for(let categoria in horasCargadas){
            auxHorasCargadasPorDia[0][categoria] = horasCargadas[categoria][0];
            auxHorasCargadasPorDia[1][categoria] = horasCargadas[categoria][1];
            auxHorasCargadasPorDia[2][categoria] = horasCargadas[categoria][2];
            auxHorasCargadasPorDia[3][categoria] = horasCargadas[categoria][3];
            auxHorasCargadasPorDia[4][categoria] = horasCargadas[categoria][4];
            auxHorasCargadasPorDia[5][categoria] = horasCargadas[categoria][5];
            auxHorasCargadasPorDia[6][categoria] = horasCargadas[categoria][6];
        }
        setHorasCargadasPorDia(auxHorasCargadasPorDia);
        console.log(horasCargadasPorDia);
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
        
    // eslint-disable-next-line
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
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item container xs={12} justify="space-between" alignItems="center">
                    <Grid item>
                        <ArrowBackIcon style={{color:"1fc71f"}} fontSize="large" onClick={() => {history.push('/recursos/'+id) }}/>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Switch style={{color:"1fc71f"}} checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" />}
                            label="Planilla"
                        />
                    </Grid> 
                </Grid>
                <Grid item container xs={12} justify='center'>
                    <Typography variant='h4'>
                        {'Horas cargadas - ' + meses[new Date(fechaLunes).getMonth()] + ' '+ (new Date().getFullYear()).toString()}
                    </Typography>
                </Grid>
                {(!horasCargadasPorDia)?
                <TableContainer className={classes.skeleton}>
                    <Table className={classes.table}>
                        <TableBody>
                            {Array(3).fill(null).map((n, keyN) => (
                                <TableRow key={keyN}>
                                    {Array(7).fill(null).map((m, keyM) => (
                                        <TableCell key={keyM}><Skeleton style={{height:'100px'}}/></TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                horasCargadasPorDia && <Grid xs  container style={{marginTop:'20px'}} justify="center" alignItems="center">
                            <Grid item>
                                <ArrowBackIosIcon style={{marginRight:'5px'}} onClick={()=>{cambiarSemana(-1)}}/>
                            </Grid>
                            
                            <Grid item  container xs spacing={1} style={{marginTop:'20px'}} direction='row' justify="center" alignItems="flex-start">
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaLunes)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Lunes" nroDia={new Date(fechaLunes).getDate()} horasDia={Object.entries(horasCargadasPorDia[0])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaMartes)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Martes" nroDia={new Date(fechaMartes).getDate()} horasDia={Object.entries(horasCargadasPorDia[1])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaMiercoles)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Miercoles" nroDia={new Date(fechaMiercoles).getDate()} horasDia={Object.entries(horasCargadasPorDia[2])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaJueves)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Jueves" nroDia={new Date(fechaJueves).getDate()} horasDia={Object.entries(horasCargadasPorDia[3])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaViernes)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Viernes" nroDia={new Date(fechaViernes).getDate()} horasDia={Object.entries(horasCargadasPorDia[4])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaSabado)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Sabado" nroDia={new Date(fechaSabado).getDate()} horasDia={Object.entries(horasCargadasPorDia[5])}
                                />
                                <CartelHorasCargadas esHoy = {parseFecha(new Date(fechaDomingo)) === parseFecha(new Date())} 
                                    desactivado= {false}
                                    dni={id} dia="Domingo" nroDia={new Date(fechaDomingo).getDate()} horasDia={Object.entries(horasCargadasPorDia[6])}
                                />
                            </Grid>
                            <Grid item>
                                <ArrowForwardIosIcon style={{marginLeft:'5px'}} onClick={()=>{cambiarSemana(1)}}/>
                            </Grid>
                            {(state.checkedA)?
                                <HorasCargadas/>
                            : null
                            }
                </Grid>}

            </Grid>
        </Paper>
    );
}