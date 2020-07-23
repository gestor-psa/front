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
import axios from 'axios';
import { useParams} from "react-router";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';



const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    nuevaHora: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: "50px"
    }
});

const parseFecha = (fecha) => {
    return fecha.slice(6,8) + "/" + fecha.slice(4,6) + "/" + fecha.slice(0,4);
}

export default () => {
    const [horas, setHoras] = useState();
    const { id } = useParams();
    const classes = useStyles({ horas });
    // const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id)
            .then(res => {
                console.log(res)
                setHoras(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [id]);


    return (
        <Fragment>
             <div className={classes.nuevaHora}>
                <Button style={{marginBottom:"20px", marginRight:"70%"}} color='secondary' variant='contained' disabled>
                    Categoría
                    <ArrowDropDownIcon />
                </Button>
                <ToggleButtonGroup style={{marginBottom:"20px"}} variant='contained' disabled>
                    <ToggleButton >
                        Día
                    </ToggleButton>
                    <ToggleButton >
                        Semana
                    </ToggleButton>
                    <ToggleButton >
                        Mes
                    </ToggleButton>
                    <ToggleButton >
                        Año
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            {/* <TableCell>Legajo</TableCell> */}
                            <TableCell>Categoría</TableCell>
                            <TableCell>ID de tarea</TableCell>
                            <TableCell>Horas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {horas && horas.map(hora => (
                            <TableRow>
                                <TableCell>{parseFecha(hora.date.toString())}</TableCell>
                                {/* <TableCell>{empleado.organization_id}</TableCell> */}
                                <TableCell>{hora.category[0].toUpperCase() + hora.category.slice(1)}</TableCell>
                                <TableCell>{hora.category === 'proyecto' ? hora.taskId : '---'}</TableCell>
                                <TableCell>{hora.hours}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}
