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
import {makeStyles} from "@material-ui/core/styles";
import {Hidden, useMediaQuery} from "@material-ui/core";
import Fecha from "soporte/common/Fecha";
import TablePagination from "@material-ui/core/TablePagination";


const useStyles = makeStyles(theme => ({
    root: {
        width: 'fit-content',
        minWidth: '80%',
        margin: 'auto'
    }
}));

export default () => {
    const [clientes, setClientes] = useState();
    const [pagina, setPagina] = useState(0);
    const {url} = useRouteMatch() || {};
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/clientes')
            .then(res => {
                setClientes(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, []);

    const handleRowClick = (id) => history.push(`${url}/${id}`);
    const isSmDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const clientesActivos = clientes && clientes.filter(ticket => ticket.estado === 'activo')
    const filasPorPagina = isSmDown ? 5 : 12
    const filasVacias = clientesActivos && filasPorPagina - Math.min(filasPorPagina, clientesActivos.length - pagina * filasPorPagina);

    return (
        <div className={classes.root}>
            <Loading mostrar={clientes} esqueleto={<EsqueletoTabla rows={filasPorPagina + 2} columns={isSmDown ? 3 : 5}/>}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <Hidden smDown>
                                    <TableCell>Razón Social</TableCell>
                                    <TableCell>CUIT</TableCell>
                                </Hidden>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha desde que es cliente</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes && clientes
                                .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                                .map(cliente => (
                                    <TableRow
                                        hover
                                        key={cliente.id}
                                        onClick={() => handleRowClick(cliente.id)}
                                    >
                                        <TableCell>{cliente.nombre}</TableCell>
                                        <Hidden smDown>
                                            <TableCell>{cliente.razonSocial}</TableCell>
                                            <TableCell>{cliente.cuit}</TableCell>
                                        </Hidden>
                                        <TableCell>{cliente.estado.capitalize()}</TableCell>
                                        <TableCell>
                                            <Fecha fecha={cliente.fechaDesdeQueEsCliente.capitalize()}
                                                   formato="DD/MM/YYYY"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {filasVacias > 0 && (
                                <TableRow style={{ height: 53 * filasVacias }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                            {clientesActivos && <TableRow><TablePagination
                                rowsPerPageOptions={[filasPorPagina]}
                                count={clientesActivos.length}
                                rowsPerPage={filasPorPagina}
                                page={pagina}
                                onChangePage={(e,  pagina) => setPagina(pagina)}
                            /></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Loading>
        </div>
    );
}
