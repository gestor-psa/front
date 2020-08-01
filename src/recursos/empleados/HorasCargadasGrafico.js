import {Bar} from 'react-chartjs-2';
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams} from "react-router";

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
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

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     },
//     {
//         label: 'Otra cosa',
//         backgroundColor: 'rgba(192,75,1,192)',
//         borderColor: 'rgba(0,0,0,1)',
//         borderWidth: 2,
//         data: [20, 20, 20, 20, 20]
//     }
//   ]
// }

// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Bar
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             },
//             scales: {
//                 xAxes: [{ stacked: true }],
//                 yAxes: [{ stacked: true }]
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }

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
    const [horasLunes, setHorasLunes] = useState();
    const [horasMartes, setHorasMartes] = useState();
    const [horasMiercoles, setHorasMiercoles] = useState();
    const [horasJueves, setHorasJueves] = useState();
    const [horasViernes, setHorasViernes] = useState();
    const { id } = useParams();
    const classes = useStyles({ horasLunes });
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    const state = {
          labels: ['Lunes', 'Martes', 'Miercoles',
                   'Jueves', 'Viernes'],
          datasets: []
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

    for (let categoria in horasCargadas){
        state['datasets'].push({
            label: categoria,
            backgroundColor: 'rgba(' + aleatorio(0,255) + ',' + aleatorio(0,255) + ',' + aleatorio(0,255)  + ',1)',
            data: horasCargadas[categoria]
        });
    }

    console.log("State: !!!!!!!!!!!!");
    console.log(state);

    return (
        <Fragment>
             <div className={classes.nuevaHora}>
            </div>
            <Bar
                data={state}
                options={{
                    title:{
                    display:false,
                    text:'Average Rainfall per month',
                    fontSize:20
                    },
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
            
            </Fragment>
    );
}
