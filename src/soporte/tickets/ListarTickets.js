import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {useHistory, useRouteMatch} from "react-router";
import EsqueletoTabla from "soporte/common/EsqueletoTabla";
import Loading from "soporte/common/Loading";


const useStyles = makeStyles({
    root: {
        position: 'relative'
    }
});

export default () => {
    const [tickets, setTickets] = useState();
    const classes = useStyles({tickets});
    const {url} = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets')
            .then(res => {
                setTickets(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, []);

    const truncate = (str, length) => {
        if (str.length > length) {
            str = str.substr(0, length);
            str = str.substr(0, Math.min(str.length, str.lastIndexOf(" "))) + '...';
        }
        return str;
    }

    const handleRowClick = (id) => {
        history.push(`${url}/${id}`);
    }

    return (
        <Loading show={tickets} esqueleto={<EsqueletoTabla rows={6} columns={6}/>}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Responsable</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Severidad</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets && tickets.map(ticket => (
                            <TableRow key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                                <TableCell>{ticket.nombre}</TableCell>
                                <TableCell>{truncate(ticket.descripcion, 45)}</TableCell>
                                <TableCell>{ticket.responsable}</TableCell>
                                <TableCell>{ticket.tipo.capitalize()}</TableCell>
                                <TableCell>{ticket.severidad.capitalize()}</TableCell>
                                <TableCell>{ticket.estado.capitalize()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Loading>
    );
}
