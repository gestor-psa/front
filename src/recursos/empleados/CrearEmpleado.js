import React, { useState, Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import "./estilos.css";

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
    },

    nuevoEmpleado: {

    }
}));
const parseFecha = (fecha) => {
    let month = '' + (fecha.getMonth() + 1);
    let day = '' + fecha.getDate();
    let year = fecha.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return parseInt(year+month+day,10);
}

export default () => {
    const classes = useStyles();
    // const [startDate, setStartDate] = useState(new Date());
    const { path } = useRouteMatch() || {};
    const [dni, setDni] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [organization_id, setOrganization_id] = useState();
    const [date_birth, setDate_birth] = useState();
    const [date_hire, setDate_hire] = useState();
    const [contract, setContract] = useState();
    const [pos, setPos] = useState();
    const history = useHistory();

    const handleChange = (event) => {
        setContract(event.target.value);
      };

    const onCrear = () => {
        // setEsperando(true);
        if (!date_birth || !date_hire){
            console.log("Ingrese la fecha");
            return;
        }
        let empleado = {"dni":parseInt(dni,10),"name":name,"surname":surname,"organization_id":parseInt(organization_id,10),"date_birth":parseFecha(date_birth),"date_hire":parseFecha(date_hire),"pos":pos,"contract":contract}
        if (!empleado.dni || !empleado.name || !empleado.surname || !empleado.organization_id || !empleado.date_birth || !empleado.date_hire || !empleado.pos || !empleado.contract){
            console.log("No hay info")
            return;
        }
        // empleado.contract: P o F
        empleado.active = true;
        // empleado.contract = "F"
        axios.post(process.env.REACT_APP_URL_RECURSOS + '/employees', empleado)
            .then((result) => {
                history.push(`/recursos`)
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Nuevo Empleado
                            </Typography>
                        </Grid>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} md={6}>
                                {<Fragment>
                                    
                                    <TextField className={classes.campo}label='DNI'onChange={(e) => setDni(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Nombre'onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Apellido'onChange={(e) => setSurname(e.target.value)}
                                    />
                                    
                                    <DatePicker
                                        selected={date_birth}
                                        onChange={date => setDate_birth(date)}
                                        customInput={<TextField className={classes.campo}label='Fecha de nacimiento'onChange={(e) => setDate_birth(e.target.value)}
                                        />}
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <TextField className={classes.campo}label='Legajo'onChange={(e) => setOrganization_id(e.target.value)}
                                    />
                                    <DatePicker
                                        selected={date_hire}
                                        onChange={date => setDate_hire(date)}
                                        customInput={<TextField className={classes.campo} label='Fecha de contratación'onChange={(e) => setDate_hire(e.target.value)}
                                        />}
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <TextField className={classes.campo}label='Puesto'onChange={(e) => setPos(e.target.value)}
                                    />
                                    <FormControl className={classes.formControl} style={{width:"40%"}}>
                                        <InputLabel id="demo-controlled-open-select-label">Contrato</InputLabel>
                                        <Select
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
                            </Grid>
                            <Grid item container xs={12} spacing={3} justify="flex-end" >
                                <Grid item>
                                    <Button onClick={() => { onCrear() }} color="secondary" variant="outlined">
                                        Crear Recurso
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button  style={{color:'red'}}onClick={() => {history.push('/recursos/') }} variant='outlined' color='inherit'>
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </AnimatedRoute>
            
        </AnimatedSwitch>
    )
}
