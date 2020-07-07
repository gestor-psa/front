import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRouteMatch } from "react-router";



const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    nuevoEmpleado: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: "50px"
    }
});

export default () => {
    const [empleados, setEmpleados] = useState();
    const classes = useStyles({ empleados });
    const { url } = useRouteMatch() || {};
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees')
            .then(res => {
                console.log(res)
                setEmpleados(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, []);


    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>DNI</TableCell>
                            <TableCell>Nombre y apellido</TableCell>
                            <TableCell>Legajo</TableCell>
                            <TableCell>Puesto</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empleados && empleados.map(empleado => (
                            <TableRow>
                                <TableCell>{empleado.dni}</TableCell>
                                <TableCell>{empleado.name + " " + empleado.surname}</TableCell>
                                <TableCell>{empleado.organization_id}</TableCell>
                                <TableCell>{empleado.pos}</TableCell>
                                <TableCell>
                                    <Button color='primary' variant='contained' to={`${url}/${empleado.dni}`} component={Link}>
                                        Ver mas
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.nuevoEmpleado}>
                <Button color='secondary' variant='contained' to={`${url}/creacion`} component={Link}>
                    Nuevo empleado
                </Button>
            </div>
        </Fragment>
    );
}
