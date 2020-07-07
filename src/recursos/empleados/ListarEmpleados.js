import React, {Fragment, useEffect, useState} from 'react';
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
import {useMediaQuery} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        position: 'relative'
    }
});

export default () => {
    const [empleados, setEmpleados] = useState();
    const classes = useStyles({empleados});
    const {url} = useRouteMatch() || {};
    const history = useHistory();
    const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees')
            .then(res => {
                console.log(res)
                setEmpleados(res.data);
            })
            .catch(error => {
                // TODO.
            })
        // setEmpleados([{"dni":41204123,"nombre":"Ignacio Nitz","legajo":100710,"puesto":"Jefe"},{"dni":41204543,"nombre":"Lucas Rial","legajo":100230,"puesto":"Gerente"}])
    }, []);

    // const truncate = (str, length) => {
    //     if (str.length > length) {
    //         str = str.substr(0, length);
    //         str = str.substr(0, Math.min(str.length, str.lastIndexOf(" "))) + '...';
    //     }
    //     return str;
    // }

    const handleRowClick = (id) => {
        history.push(`${url}/${id}`);
    }

    return (
        // <Loading mostrar={tickets} esqueleto={<EsqueletoTabla rows={6} columns={isMdUp ? 6 : 3}/>}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>DNI</TableCell>
                            {isMdUp && (
                                <Fragment>
                                    <TableCell>Nombre y apellido</TableCell>
                                    <TableCell>Legajo</TableCell>
                                    <TableCell>Puesto</TableCell>
                                </Fragment>
                            )}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empleados && empleados.map(empleado => (
                            <TableRow key={empleado.dni} onClick={() => handleRowClick(empleado.dni)}>
                                <TableCell>{empleado.dni}</TableCell>
                                {isMdUp && (
                                    <Fragment>
                                        <TableCell>{empleado.name+ " "+ empleado.surname}</TableCell>
                                        <TableCell>{empleado.organization_id}</TableCell>
                                        <TableCell>{empleado.pos}</TableCell>
                                    </Fragment>
                                )}
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        // </Loading>
    );
}
