import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/es';
import {useMediaQuery, useTheme, withWidth} from "@material-ui/core";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {Line} from "react-chartjs-2";


export default withWidth()(({width}) => {
    const [tickets, setTickets] = useState();
    const theme = useTheme()
    const height = 280
    const isXs = useMediaQuery(theme => theme.breakpoints.down('xs'));

    useEffect(() => {
        const slices = {xs: 20, sm: 15, md: 0, lg: 0}
        const formatData = (data) =>
            data.map(([fecha, cantidad]) => ({
                x: moment(fecha, "YYYY-MM-DD"),
                y: cantidad
            })).slice(1).slice(slices[width])

        let timer
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsPendientes')
            .then(res => {
                setTickets(formatData(Object.entries(res.data)))
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
                            text: 'Tickets pendientes',
                            fontSize: isXs ? 18 : 24,
                            fontColor: theme.palette.grey[800],
                            padding: 20
                        },
                        legend: {
                            display: false
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
                                label: 'Tickets pendientes',
                                data: tickets,
                                lineTension: 0,
                                borderColor: theme.palette.secondary.main,
                                borderWidth: 3,
                                backgroundColor: 'rgba(255,255,255,0)',
                                pointRadius: 0,
                                pointBackgroundColor: theme.palette.secondary.main,
                                pointHoverBorderWidth: 3,
                                pointHoverRadius: 4,
                                pointHitRadius: 5
                            }
                        ]
                    }}
                />}
        </Loading>
    )
})
