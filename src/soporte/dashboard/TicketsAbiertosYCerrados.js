import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    ArgumentAxis,
    Chart,
    LineSeries, Title, Tooltip,
    ValueAxis,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import Paper from "@material-ui/core/Paper";
import {Animation, EventTracker, ValueScale} from "@devexpress/dx-react-chart";
import moment from "moment";
import 'moment/locale/es';
import {useTheme} from "@material-ui/core";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import LeyendaRoot from "soporte/dashboard/LeyendaRoot";
import LineWithCirclePoint from "soporte/dashboard/LineWithCirclePoint";


export default () => {
    const [tickets, setTickets] = useState();
    const theme = useTheme()
    const height = 400

    const formatData = (data) =>
        data.map(({dia, ...datos}) => ({
            dia: moment(dia, "YYYY-MM-DD"),
            ...datos
        }))

    useEffect(() => {
        let timer
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsAbiertosYCerradosPorDia')
            .then(res => {
                setTickets(formatData(res.data))
                timer = setTimeout(() => setTickets(tickets => [...tickets]), 500)
            })
        return () => clearTimeout(timer)
    }, []);

    return (
        <Loading mostrar={tickets} esqueleto={<Skeleton variant="rect" height={height}/>}>
            {tickets && <Paper>
                <Chart data={tickets} height={height} style={{display: 'flex'}}>
                    <Title text="Tickets abiertos y cerrados por día"/>
                    <ArgumentAxis
                        showGrid={true}
                        tickFormat={() => (e) => moment(e).format("MMM Do")}
                    />

                    <ValueAxis
                        tickFormat={() => n => n % 1 === 0 ? n.toString() : ''}
                    />
                    <ValueScale modifyDomain={d => [0, d[1] + 1]}/>

                    <LineSeries
                        name="Tickets abiertos"
                        argumentField="dia" // x
                        valueField="cantidadAbiertos" // y
                        color={theme.palette.secondary.main}
                        seriesComponent={LineWithCirclePoint}
                    />

                    <LineSeries
                        name="Tickets cerrados"
                        argumentField="dia" // x
                        valueField="cantidadCerrados" // y
                        color={theme.palette.primary.main}
                        seriesComponent={LineWithCirclePoint}
                    />

                    <Legend
                        position="bottom"
                        rootComponent={LeyendaRoot}
                    />
                    <Animation/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </Paper>}
        </Loading>
    )
}
