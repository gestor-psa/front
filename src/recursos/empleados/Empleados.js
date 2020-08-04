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
import Grid from "@material-ui/core/Grid";
import Skeleton from '@material-ui/lab/Skeleton';

// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//      if ((new Date().getTime() - start) > milliseconds) {
//       break;
//      }
//     }
//    }

const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    nuevoEmpleado: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: "50px"
    },
    skeleton: {
        top: '20',
        left: 0,
        bottom: '20',
        width: '100%',
        '& td': {
            width: '100%'
        },
        '& tr': {
            display: 'flex'
        }
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
            <Grid container spacing={3} direction="row" justify="space-between">
                <Grid item>
                    {/* <Button style={{marginTop:'20px'}} color='secondary' variant='contained' disabled>
                        Buscar
                    </Button> */}
                </Grid>
                <Grid item>
                    <Button style={{marginTop:'20px'}} color='secondary' variant='contained' to={`${url}/creacion`} component={Link}>
                        Nuevo recurso
                    </Button>
                </Grid>
                {
                (!empleados)?
                <TableContainer component={Paper} className={classes.skeleton}>
                    <Table className={classes.table}>
                        <TableBody>
                            {Array(7).fill(null).map((n, keyN) => (
                                <TableRow key={keyN}>
                                    {Array(5).fill(null).map((m, keyM) => (
                                        <TableCell key={keyM}><Skeleton/></TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>DNI</TableCell>
                                    <TableCell>Nombre y apellido</TableCell>
                                    {/* <TableCell>Legajo</TableCell> */}
                                    <TableCell>Contrato</TableCell>
                                    <TableCell>Puesto</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empleados && empleados.map(empleado => (
                                    <TableRow>
                                        <TableCell>{empleado.dni}</TableCell>
                                        <TableCell>{empleado.name + " " + empleado.surname}</TableCell>
                                        {/* <TableCell>{empleado.organization_id}</TableCell> */}
                                        <TableCell>{empleado.contract ==='F'? "Full time":"Part time"}</TableCell>
                                        <TableCell>{empleado.pos}</TableCell>
                                        <TableCell>
                                            <Button color='primary' variant='contained' to={`${url}/${empleado.dni}`} component={Link}>
                                                + Info
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> 
                }
                
            </Grid>
            
        </Fragment>
    );
}
