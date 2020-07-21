import React, { useEffect, useState, Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useRouteMatch } from "react-router";
import axios from "axios";
import {useHistory} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";

// /empleados
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    },
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    }
}));
const parseFecha = (fecha) => {
    return fecha.slice(6,8) + "/" + fecha.slice(4,6) + "/" + fecha.slice(0,4);
}

const parseDate = (fecha) => {
    let month = '' + (fecha.getMonth() + 1);
    let day = '' + fecha.getDate();
    let year = fecha.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return parseInt(year+month+day,10);
}

const crearFecha = (numero) => {
    let cadena = numero.toString();
    let fecha = new Date(cadena.slice(0,4)+"/"+cadena.slice(4,6)+"/"+cadena.slice(6,8))
    return fecha;
}

export default () => {
    const classes = useStyles();
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const [empleado, setEmpleado] = useState();
    const [hire, setHire] = useState();
    const [birth, setBirth] = useState();
    const history = useHistory();
    const [dniInicial, setDniInicial] = useState();

    const handleChange = (event) => {
        empleado.contract = event.target.value;
      };
    
    const onModificar = () => {
        // setEsperando(true);
        if (!empleado.dni || !empleado.name || !empleado.surname || !empleado.organization_id || !empleado.date_birth || !empleado.date_hire || !empleado.pos || !empleado.contract){
            console.log("No hay info")
            return;
        }
        empleado.active = true;
        axios.put(process.env.REACT_APP_URL_RECURSOS + '/employees/' + dniInicial, empleado)
            .then((result) => {
                history.push(`/recursos`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + id)
            .then(res => {
                setEmpleado(res.data);
                setBirth(crearFecha(res.data.date_birth));
                setHire(crearFecha(res.data.date_hire));
                setDniInicial(res.data.dni);
            })
        // setEmpleado({"dni":41204123,"name":"Ignacio","surname":"Nitz","organization_id":"100710","pos":"Jefe","date_birth":19900425,"date_hired":20100427});
    }, [id]);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {empleado &&<Typography variant='h4'>
                                {empleado.name + " "+ empleado.surname}
                    </Typography>}
                        </Grid>
                        <Grid item container spacing={6} xs={12}>
                            <Grid item xs={12} md={6}>
                                {empleado && <Fragment>
                                    
                                    <TextField className={classes.campo}defaultValue={empleado.dni} label='DNI'onChange={(e) => empleado.dni = e.target.value}
                                    />
                                    <TextField className={classes.campo}defaultValue={empleado.name}label='Nombre'onChange={(e) => empleado.name = e.target.value}
                                    />
                                    <TextField className={classes.campo}defaultValue={empleado.surname}label='Apellido'onChange={(e) => empleado.surname = e.target.value}
                                    />
                                    
                                    <DatePicker
                                        selected={birth}
                                        onChange={date => {empleado.date_birth = parseDate(date); setBirth(date)}}
                                        customInput={<TextField className={classes.campo}label='Fecha de nacimiento'onChange={(e) => empleado.date_birth = e.target.value}
                                        />}
                                        
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <TextField className={classes.campo}defaultValue={empleado.organization_id}label='Legajo'onChange={(e) => empleado.organization_id = e.target.value}
                                    />
                                    <DatePicker
                                        selected={hire}
                                        onChange={date => {empleado.date_hire = parseDate(date); setHire(date)}}
                                        customInput={<TextField className={classes.campo}value={parseFecha(empleado.date_hire.toString())} label='Fecha de contratación'onChange={(e) => {console.log("Holaa");empleado.date_hire = parseDate(e.target.value)}}
                                        />}
                                        
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <TextField className={classes.campo}defaultValue={empleado.pos}label='Puesto'onChange={(e) => empleado.pos = e.target.value}
                                    />
                                    <FormControl className={classes.formControl} style={{width:"40%"}}>
                                        <InputLabel id="demo-controlled-open-select-label">Contrato</InputLabel>
                                        <Select
                                        defaultValue={empleado.contract}
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        // open={open}
                                        // onClose={handleClose}
                                        // onOpen={handleOpen}
                                        // value={age}
                                        onChange={handleChange}
                                        >
                                        {/* <MenuItem value="">
                                            Contrato
                                        </MenuItem> */}
                                        <MenuItem value="F">Full time</MenuItem>
                                        <MenuItem value="P">Part time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Fragment>}
                                <div className={classes.nuevoEmpleado}>
                                    <Button style={{marginTop:"40px"}}onClick={() => { onModificar() }} color="secondary" variant='contained'>
                                        Modificar empleado
                                    </Button>
                                    <Button  style={{marginTop:"40px", marginLeft:"40px"}} color='secondary' variant='contained' disabled>
                                        Cancelar
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <Comentarios mostrar={Boolean(ticket)}/> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Acciones mostrar={Boolean(ticket)}/> */}
                        </Grid>
                    </Grid>
                </Paper>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
