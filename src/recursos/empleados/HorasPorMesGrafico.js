import {Bar} from 'react-chartjs-2';
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams} from "react-router";

  
function pasarHoras(pos, desde, horasCarg){
    for (let hora in desde){
        horasCarg[pos] += desde[hora].hours;
    }
}

const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    nuevaHora: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: "50px"
    }
});

export default () => {
    const [horasEnero, setHorasEnero] = useState();
    const [horasFebrero, setHorasFebrero] = useState();
    const [horasMarzo, setHorasMarzo] = useState();
    const [horasAbril, setHorasAbril] = useState();
    const [horasMayo, setHorasMayo] = useState();
    const [horasJunio, setHorasJunio] = useState();
    const [horasJulio, setHorasJulio] = useState();
    const [horasAgosto, setHorasAgosto] = useState();
    const [horasSeptiembre, setHorasSeptiembre] = useState();
    const [horasOctubre, setHorasOctubre] = useState();
    const [horasNoviembre, setHorasNoviembre] = useState();
    const [horasDiciembre, setHorasDiciembre] = useState();
    const { id } = useParams();
    const classes = useStyles({ horasEnero });
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    
    const state = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [],
    }


    useEffect(() => {

        console.log("ID !!!!!!!!!!!!!!!!");
        console.log(id);
        var dd = String(1).padStart(2, '0')

        //Enero
        var mm = String(1).padStart(2, '0');
        var yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasEnero(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Febrero
         mm = String(2).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasFebrero(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Marzo
         mm = String(3).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasMarzo(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Abril
         mm = String(4).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasAbril(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Mayo
         mm = String(5).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasMayo(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Junio
         mm = String(6).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasJunio(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Julio
         mm = String(7).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasJulio(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Agosto
         mm = String(8).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasAgosto(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Septiembre
         mm = String(9).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasSeptiembre(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Octubre
         mm = String(10).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasOctubre(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Noviembre
         mm = String(11).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasNoviembre(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

        //Diciembre
         mm = String(12).padStart(2, '0');
         yyyy = new Date().getFullYear();
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm + dd)
            .then(res => {
                console.log(res)
                setHorasDiciembre(res.data);
            })
            .catch(error => {
                // TODO.
        }); 

    }, [id]);


    var horasCargadas = [0,0,0,0,0,0,0,0,0,0,0,0];    

    console.log(horasEnero);
    console.log(horasFebrero);
    console.log(horasMarzo);
    console.log(horasAbril);
    console.log(horasMayo);
    console.log(horasJunio);
    console.log(horasJulio);
    console.log(horasAgosto);
    console.log(horasSeptiembre);
    console.log(horasOctubre);
    console.log(horasNoviembre);
    console.log(horasDiciembre);

    pasarHoras(0, horasEnero, horasCargadas);
    pasarHoras(1, horasFebrero, horasCargadas);
    pasarHoras(2, horasMarzo, horasCargadas);
    pasarHoras(3, horasAbril, horasCargadas);
    pasarHoras(4, horasMayo, horasCargadas);
    pasarHoras(5, horasJunio, horasCargadas);
    pasarHoras(6, horasJulio, horasCargadas);
    pasarHoras(7, horasAgosto, horasCargadas);
    pasarHoras(8, horasSeptiembre, horasCargadas);
    pasarHoras(9, horasOctubre, horasCargadas);
    pasarHoras(10, horasNoviembre, horasCargadas);
    pasarHoras(11, horasDiciembre, horasCargadas);


    state['datasets'].push({
        backgroundColor: 'rgb(0,128,255)',
        data: horasCargadas,
        borderWidth: 4,
        borderColor: 'rgb(77,166,255)',
        hoverBorderWidth: 2,
    });


    console.log("State: !!!!!!!!!!!!");
    console.log(state);
    console.log("Horas Cargadas");
    console.log(horasCargadas);

    return (
        <Fragment>
             <div className={classes.nuevaHora}>
            </div>
            <Bar
                data={state}
                options={{
                    title:{
                    display:true,
                    text:'Horas cargadas '+ (new Date().getFullYear().toString()),
                    fontSize:20
                    },
                    legend:{
                    display:false,
                    position:'right'
                    },
                    scales: {
                        xAxes: [{ 
                            
                            display: true}],
                        yAxes: [{ 
                            display: false, }]
                    }
                }}
            />
            </Fragment>
    );
}
