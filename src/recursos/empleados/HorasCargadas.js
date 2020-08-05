import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useParams} from "react-router";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    const [categoria, setCategoria] = React.useState('');

    const handleChange = (event) => {
      setCategoria(event.target.value);
    
        // categoria && id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id +'/' + categoria)
        // .then(res => {
        //     console.log(res)
        //     setHoras(res.data);
        // })
        // .catch(error => {
        //     // TODO.
        // })
      
    };

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
                <Grid container spacing={3} direction="row" justify="space-between" style={{marginTop:'20px'}}>
                    {/* <Grid item xs={12}>
                        <ArrowBackIcon style={{color:"1fc71f"}} fontSize="large" onClick={() => {history.push('/recursos/'+id) }}/>
                    </Grid> */}
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={categoria}
                            onChange={handleChange}
                            style = {{minWidth:'120px'}}
                            >
                            <MenuItem value = {null}>
                                <em>Todas</em>
                            </MenuItem>
                            <MenuItem value={'proyecto'}>Proyecto</MenuItem>
                            <MenuItem value={'soporte'}>Soporte</MenuItem>
                            <MenuItem value={'fuera de oficina'}>Fuera de oficina</MenuItem>
                            <MenuItem value={'estudio'}>Estudio</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
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
                    </Grid>  
                </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            {/* <TableCell>Legajo</TableCell> */}
                            <TableCell>Categoría</TableCell>
                            <TableCell>ID de Proyecto</TableCell>
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
                                <TableCell>{hora.category === 'proyecto' ? hora.projectId : '---'}</TableCell>
                                <TableCell>{hora.hours}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}
