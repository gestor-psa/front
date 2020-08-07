import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/es';
import {useMediaQuery, useTheme, withWidth} from "@material-ui/core";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {Line} from 'react-chartjs-2';

export default withWidth()(({width}) => {
    const [tickets, setTickets] = useState();
    const theme = useTheme()
    const isXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const height = 330

    useEffect(() => {
        const slices = {xs: 20, sm: 15, md: 0, lg: 0}
        const formatData = (data) =>
            data.map(([fecha, [cantidadAbiertos, cantidadCerrados]]) => ({
                dia: moment(fecha, "YYYY-MM-DD"),
                abiertos: cantidadAbiertos,
                cerrados: cantidadCerrados
            })).slice(slices[width])

        let timer
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsAbiertosYCerradosPorDia')
            .then(res => {
                setTickets(formatData(Object.entries(res.data)))
                timer = setTimeout(() => setTickets(tickets => [...tickets]), 500)
            })
        return () => clearTimeout(timer)
    }, [width]);

    return (
        <Loading mostrar={tickets} esqueleto={<Skeleton variant="rect" height={height}/>}>
            {tickets &&
                <Line
                    height={height}
                    options={{
                        layout: {
                            padding: {
                                left: 0,
                                right: 8,
                                top: 0,
                                bottom: 0
                            }
                        },
                        title: {
                            display: true,
                            text: 'Tickets abiertos y cerrados',
                            fontSize: isXs ? 18 : 24,
                            fontColor: theme.palette.grey[800],
                            padding: 20
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                boxWidth: 9,
                                fontSize: 16,
                                fontColor: theme.palette.grey[800],
                                fontStyle: 'bold',
                                usePointStyle: true
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                type: 'time',
                                ticks: {
                                    source: 'auto',
                                    fontSize: 14
                                },
                                time: {
                                    unit: 'week',
                                    displayFormats: {
                                        week: 'MMM D'
                                    },
                                    tooltipFormat: 'll'
                                },
                            }],
                            yAxes: [{
                                ticks: {
                                    source: 'auto',
                                    fontSize: 14,
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }]
                        }
                    }}
                    data={{
                        datasets: [
                            {
                                label: 'Tickets Abiertos',
                                data: tickets.map(({dia, abiertos}) => ({
                                    x: dia,
                                    y: abiertos
                                })),
                                lineTension: 0,
                                borderColor: theme.palette.secondary.main,
                                borderWidth: 3,
                                backgroundColor: 'rgba(255,255,255,0)',
                                pointBackgroundColor: theme.palette.secondary.lighter(95),
                                pointRadius: 4,
                                pointBorderWidth: 3,
                                pointHoverBorderWidth: 3,
                                pointHoverRadius: 6
                            }, {
                                label: 'Tickets Cerrados',
                                data: tickets.map(({dia, cerrados}) => ({
                                    x: dia,
                                    y: cerrados
                                })),
                                lineTension: 0,
                                borderColor: theme.palette.primary.main,
                                borderWidth: 3,
                                backgroundColor: 'rgba(255,255,255,0)',
                                pointBackgroundColor: theme.palette.primary.lighter(85),
                                pointRadius: 4,
                                pointBorderWidth: 3,
                                pointHoverBorderWidth: 3,
                                pointHoverRadius: 6
                            }
                        ]
                    }}
                />}
        </Loading>
    )
})
