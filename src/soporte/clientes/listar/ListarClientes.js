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


const useStyles = makeStyles(theme => ({
    root: {
        width: 'fit-content',
        minWidth: '80%',
        margin: 'auto'
    }
}));

export default () => {
    const [clientes, setClientes] = useState();
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

    return (
        <div className={classes.root}>
            <Loading mostrar={clientes} esqueleto={<EsqueletoTabla rows={6} columns={isSmDown ? 3 : 5}/>}>
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
                                        <TableCell>{cliente.fechaDesdeQueEsCliente.capitalize()}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Loading>
        </div>
    );
}
