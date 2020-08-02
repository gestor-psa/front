import React, {useEffect, useState, Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';

function pasarHoras(pos, desde, horasCarg){
    for (let hora in desde){
        horasCarg[pos] += desde[hora].hours;
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        },
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    },

    nuevoEmpleado: {
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const crearFecha = (dia) => {
    let fecha = new Date();
    let month = String(fecha.getMonth() + 1).padStart(2, '0');
    let day = String(dia).padStart(2, '0');
    let year = fecha.getFullYear();
    console.log(year+month+day,10);
    return parseInt(year+month+day,10);
}


export default (props) => {
    const classes = useStyles();
    const [hours, setHours] = useState();
    const [taskId, setTaskId] = useState();
    const [category, setCategory] = useState();
    const [proyecto, setProyecto] = useState();
    const [tasks, setTasks] = useState();

    const onCrear = () => {
        // setEsperando(true);
        let hora = {"employeeDni":parseInt(props.dni,10),"hours":parseInt(hours,10),"taskId":parseInt(taskId,10),"projectId":parseInt(proyecto,10),"category":category,"date":crearFecha(props.nroDia)}
        console.log(hora);
        if (hora.category==='proyecto' && !hora.taskId){
            console.log("No hay una tarea asignada")
            return;
        }
        if (!hora.employeeDni || !hora.hours || !hora.category || !hora.date){
            console.log("No hay info")
            return;
        }
        if (!hora.taskId && !hora.projectId){
            hora.taskId = 1;
            hora.projectId = 1;
        }
        console.log(hora);

        axios.post(process.env.REACT_APP_URL_RECURSOS + '/hours', hora)
            .then((result) => {
                console.log(result);
                props.dni && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + props.dni + '/day/' + crearFecha(props.nroDia))
                    .then(res => {
                        console.log(res)
                        setHorasDiaActual(res.data);
                    })
                    .catch(error => {
                        // TODO.
                });
                pasarHoras(0,horasDiaActual,horasCargadas);

            })
            .catch(error => {
                // TODO.
                console.log(error.response);
        });

        
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
      };

    const handleChangeTarea = (event) => {
        setTaskId(event.target.value);
    };
    
    const handleChangeProyecto = (event) => {
        setProyecto(event.target.value);
        console.log(event.target.value);
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/'+ event.target.value + '/tareas')
            .then(res => {
                setTasks(res.data);
            })
    };

    const [horasDiaActual, setHorasDiaActual] = useState();
    var horasCargadas = [0];

    useEffect(() => {
        props.dni && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + props.dni + '/day/' + crearFecha(props.nroDia))
            .then(res => {
                console.log(res)
                setHorasDiaActual(res.data);
            })
            .catch(error => {
                // TODO.
        }); 
    }, [props.dni, props.nroDia]);

    pasarHoras(0,horasDiaActual,horasCargadas);

    return (
        <Grid item container xs justify="center" alignItems="center" style={{maxWidth: "260px"}}>
        <Fragment>
            <Card className={classes.root} variant="outlined" >
                <Grid item xs>
                <Typography variant="h5" component="h2" align='center'style={{color:props.esHoy?"red":"black"}}>
                    {props.dia}
                </Typography>
                </Grid>
                <Grid item xs>
                <Typography variant="h5" component="h2" align='center' style={{color:props.esHoy?"red":"black"}}>
                    {props.nroDia}
                </Typography>
                </Grid>
                <Grid item xs>
                <FormControl disabled = {props.desactivado} className={classes.formControl} style={{ width: "100%" }}>
                    <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        onChange={handleChangeCategory}
                    >
                        <MenuItem value="proyecto">Proyectos</MenuItem>
                        <MenuItem onClick={() => { setProyecto(null); setTaskId(null); }} value="soporte">Soporte</MenuItem>
                        <MenuItem onClick={() => { setProyecto(null); setTaskId(null); }} value="estudio">Estudio</MenuItem>
                        <MenuItem onClick={() => { setProyecto(null); setTaskId(null); }} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs>
                {category === 'proyecto' && <FormControl className={classes.formControl} style={{ width: "100%" }}>
                    <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        defaultValue={proyecto}
                        value={proyecto}
                        onChange={handleChangeProyecto}
                    >
                        {props.proyectos && props.proyectos.map(proyecto => (
                            <MenuItem onClick={() => { setTaskId(null); console.log(taskId) }} value={proyecto.id}>{proyecto.nombre}</MenuItem>

                        ))
                        }
                    </Select>
                </FormControl>}
                </Grid>
                <Grid item xs>
                    {category === 'proyecto' && proyecto && <FormControl className={classes.formControl} style={{ width: "100%" }}>
                        <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            onChange={handleChangeTarea}
                            defaultValue={taskId}
                            value={taskId}
                        >
                            {tasks && tasks.map(tarea => (
                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                            ))
                            }
                        </Select>
                    </FormControl>}
                </Grid>
                <Grid item xs>
                    <TextField disabled = {props.desactivado} type="number" className={classes.campo} label='Horas' onChange={(e) => setHours(e.target.value)}/>
                </Grid>
                <Grid item container xs justify="center" alignItems="center">
                    <Button style={{ marginTop: "10px", marginBottom: '15px'}} disabled={props.desactivado} onClick={onCrear} color="secondary" variant='outlined'>
                        Cargar
                    </Button>
                </Grid>
                <Grid item container xs justify="center" alignItems="center">
                    {!props.desactivado && <FormControl className={classes.formControl} style={{ width: "100%" }}>
                        <Typography variant="h15"  align='center'>
                            {'Horas cargadas: ' + horasCargadas}
                        </Typography>
                    </FormControl>}
                </Grid>
            </Card>
        </Fragment>
        </Grid>
    )
}