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

export default (props) => {
    const { id } = useParams();
    const classes = useStyles();
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    
    let [state, setState] = useState({
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [],
    })

    function calcularFaltante(horas){
        var num = 0;
        if(props.contrato ==='F'){
            num = 160 - horas;
        }else{
            num = 80 - horas;
        }
        
        return num;
    }

    useEffect(() => {

        var horasCargadas = [0,0,0,0,0,0,0,0,0,0,0,0]; 
        console.log("ID !!!!!!!!!!!!!!!!");
        console.log(id);
        var dd = String(1).padStart(2, '0')
        var yyyy = new Date().getFullYear();

        //Enero
        var mm1 = String(1).padStart(2, '0');
                
        //Febrero
        var mm2 = String(2).padStart(2, '0');
        
        //Marzo
        var mm3 = String(3).padStart(2, '0');

        //Abril
        var mm4 = String(4).padStart(2, '0');

        //Mayo
        var mm5 = String(5).padStart(2, '0');        

        //Junio
        var mm6 = String(6).padStart(2, '0');        

        //Julio
        var mm7 = String(7).padStart(2, '0');        

        //Agosto
        var mm8 = String(8).padStart(2, '0');    

        //Septiembre
        var mm9 = String(9).padStart(2, '0');

        //Octubre
        var mm10 = String(10).padStart(2, '0');

        //Noviembre
        var mm11 = String(11).padStart(2, '0');

        //Diciembre
        var mm12 = String(12).padStart(2, '0');
         
        

        id && axios.all([
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm1 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm2 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm3 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm4 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm5 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm6 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm7 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm8 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm9 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm10 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm11 + dd),
            id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id + '/month/' + yyyy + mm12 + dd)
        ])
        .then(axios.spread((data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12) => {
            var dataset = [];

            pasarHoras(0, data1.data, horasCargadas);
            pasarHoras(1, data2.data, horasCargadas);
            pasarHoras(2, data3.data, horasCargadas);
            pasarHoras(3, data4.data, horasCargadas);
            pasarHoras(4, data5.data, horasCargadas);
            pasarHoras(5, data6.data, horasCargadas);
            pasarHoras(6, data7.data, horasCargadas);
            pasarHoras(7, data8.data, horasCargadas);
            pasarHoras(8, data9.data, horasCargadas);
            pasarHoras(9, data10.data, horasCargadas);
            pasarHoras(10, data11.data, horasCargadas);
            pasarHoras(11, data12.data, horasCargadas);
            
            var horasEsperadas = [
                calcularFaltante(horasCargadas[0]),
                calcularFaltante(horasCargadas[1]),
                calcularFaltante(horasCargadas[2]),
                calcularFaltante(horasCargadas[3]),
                calcularFaltante(horasCargadas[4]),
                calcularFaltante(horasCargadas[5]),
                calcularFaltante(horasCargadas[6]),
                calcularFaltante(horasCargadas[7]),
                calcularFaltante(horasCargadas[8]),
                calcularFaltante(horasCargadas[9]),
                calcularFaltante(horasCargadas[10]),
                calcularFaltante(horasCargadas[11])
            ];

            dataset.push({
                label: 'Cargado',
                backgroundColor: 'rgb(0,128,255)',
                data: horasCargadas,
                borderWidth: 4,
                borderColor: 'rgb(77,166,255)',
                hoverBorderWidth: 2,
            });

            dataset.push({
                label: 'Faltante',
            backgroundColor: 'rgba(177,177,177,0.5)',
            data: horasEsperadas,
            borderWidth: {top:3},
            borderColor: '#9932CC',
            
            });

            setState({
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: dataset,
            })
            console.log("State: !!!!!!!!!!!!");
            console.log(state);
            console.log("Horas Cargadas");
            console.log(horasCargadas);
            console.log(horasEsperadas);

        }))
        .catch(error => {
            // TODO.
        });

// eslint-disable-next-line
    }, [id]);



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
                            display: true,
                            stacked: true}],
                        yAxes: [{ 
                            display: true,
                            stacked: true }]
                    }
                }}
            />
            </Fragment>
    );
}
