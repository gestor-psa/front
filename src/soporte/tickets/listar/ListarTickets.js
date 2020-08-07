import React, {useEffect, useState} from 'react';
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
import {useMediaQuery} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import Hidden from "@material-ui/core/Hidden";


export default () => {
    const [tickets, setTickets] = useState();
    const [pagina, setPagina] = useState(0);
    const {url} = useRouteMatch() || {};
    const history = useHistory();
    const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
    const isLgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));

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

    const ticketsNoCerrados = tickets && tickets.filter(ticket => ticket.estado !== 'cerrado')
    const filasPorPagina = isMdUp ? 12 : 5
    const filasVacias = ticketsNoCerrados && filasPorPagina - Math.min(filasPorPagina, ticketsNoCerrados.length - pagina * filasPorPagina);

    return (
        <Loading mostrar={ticketsNoCerrados}
                 esqueleto={<EsqueletoTabla rows={filasPorPagina + 2} columns={isMdUp ? 6 : 3}/>}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <Hidden smDown>
                                <TableCell>Descripción</TableCell>
                            </Hidden>
                            <TableCell>Tipo</TableCell>
                            <Hidden xsDown>
                                <TableCell>Severidad</TableCell>
                            </Hidden>
                            <Hidden smDown>
                                <TableCell>Estado</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ticketsNoCerrados && ticketsNoCerrados
                            .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                            .map(ticket => (
                                <TableRow
                                    hover
                                    key={ticket.id}
                                    onClick={() => handleRowClick(ticket.id)}
                                >
                                    <TableCell>#{ticket.id}</TableCell>
                                    <TableCell>{truncate(ticket.nombre, isMdUp ? 30 : 20)}</TableCell>
                                    <Hidden smDown>
                                        <TableCell>{truncate(ticket.descripcion, isLgUp ? 80 : 45)}</TableCell>
                                    </Hidden>
                                    <TableCell>{ticket.tipo.capitalize()}</TableCell>
                                    <Hidden xsDown>
                                        <TableCell>{ticket.severidad.capitalize()}</TableCell>
                                    </Hidden>
                                    <Hidden smDown>
                                        <TableCell>{ticket.estado.capitalize()}</TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        {filasVacias > 0 && (
                            <TableRow style={{height: 53 * filasVacias}}>
                                <TableCell colSpan={5}/>
                            </TableRow>
                        )}
                        {ticketsNoCerrados && <TableRow><TablePagination
                            rowsPerPageOptions={[filasPorPagina]}
                            count={ticketsNoCerrados.length}
                            rowsPerPage={filasPorPagina}
                            page={pagina}
                            onChangePage={(e, pagina) => setPagina(pagina)}
                        /></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Loading>
    );
}
