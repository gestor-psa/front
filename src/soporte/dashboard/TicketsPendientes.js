import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    ArgumentAxis,
    Chart,
    LineSeries, Title, Tooltip,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import Paper from "@material-ui/core/Paper";
import {Animation, EventTracker, ValueScale} from "@devexpress/dx-react-chart";
import moment from "moment";
import 'moment/locale/es';
import {useTheme} from "@material-ui/core";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";


export default () => {
    const [tickets, setTickets] = useState();
    const theme = useTheme()
    const height = 280

    const formatData = (data) =>
        data.map(({dia, cantidad}) => ({
            cantidad: cantidad,
            dia: moment(dia, "YYYY-MM-DD")
        }))

    useEffect(() => {
        let timer
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsAcumuladosPorDia')
            .then(res => {
                setTickets(formatData(res.data))
                timer = setTimeout(() => setTickets(tickets => [...tickets]), 500)
            })
        return () => clearTimeout(timer)
    }, []);

    return (
        <Loading mostrar={tickets} esqueleto={<Skeleton variant="rect" height={height}/>}>
            {tickets && <Paper>
                <Chart data={tickets} style={{display: 'flex'}} height={height}>
                    <Title text="Tickets pendientes"/>
                    <ArgumentAxis
                        showGrid={true}
                        tickFormat={() => (e) => moment(e).format("MMM Do")}
                    />

                    <ValueAxis/>
                    <ValueScale modifyDomain={d => [0, d[1] + 5]}/>

                    <LineSeries
                        name="tickets acumulados por día"
                        argumentField="dia" // x
                        valueField="cantidad" // y
                        color={theme.palette.secondary.main}
                    />
                    <Animation/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </Paper>}
        </Loading>
    )
}
