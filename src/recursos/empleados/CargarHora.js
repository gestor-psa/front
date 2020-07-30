import React, { useEffect, useState, Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useParams, useHistory} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
// import "./estilos.css";

// /empleados
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
    const { id } = useParams();
    const [dni, setDni] = useState();
    const [hours, setHours] = useState();
    const [taskId, setTaskId] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState();
    const [proyectos, setProyectos] = useState();
    const [proyecto, setProyecto] = useState();
    const [tasks, setTasks] = useState();
    const history = useHistory();
    var numeroDiaLunes;
    var numeroDiaMartes;
    var numeroDiaMiercoles;
    var numeroDiaJueves;
    var numeroDiaViernes;

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

    useEffect(() => {
        setDni(id);
        id && axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos')
            .then(res => {
                setProyectos(res.data);
                console.log(res.data);
            })
    }, [id]);

    const onCrear = () => {
        // setEsperando(true); 
        if (!date){
            console.log("Ingrese una fecha");
            return;
        }
        let hora = {"employeeDni":parseInt(dni,10),"hours":parseInt(hours,10),"taskId":parseInt(taskId,10),"category":category,"date":parseFecha(date)}
        if (hora.category==='proyecto' && !hora.taskId){
            console.log("No hay una tarea asignada")
            return;
        }
        if (!hora.employeeDni || !hora.hours || !hora.category || !hora.date){
            console.log("No hay info")
            return;
        }
        if (!hora.taskId){
            hora.taskId = 1;
        }
        console.log(hora);

        axios.post(process.env.REACT_APP_URL_RECURSOS + '/hours', hora)
            .then((result) => {
                history.push(`/recursos/`+id);
                console.log(result);
            })
            .catch(error => {
                // TODO.
                console.log(error.response);
            });
    }
    
    const numeroLunes = () => {
        switch (new Date().getDay()){
            case 0:
                numeroDiaLunes = (new Date().getDate() + 1);
                return numeroDiaLunes;
            case 1:
                numeroDiaLunes = (new Date().getDate() + 0);
                return numeroDiaLunes;
            case 2:
                numeroDiaLunes = (new Date().getDate() - 1);
                return numeroDiaLunes;
            case 3:
                numeroDiaLunes = (new Date().getDate() - 2);
                return numeroDiaLunes;
            case 4:
                numeroDiaLunes = (new Date().getDate() - 3);
                return numeroDiaLunes;
            case 5:
                numeroDiaLunes = (new Date().getDate() - 4);
                return numeroDiaLunes;
            case 6:
                numeroDiaLunes = (new Date().getDate() - 5);
                return numeroDiaLunes;
            default:
        }
    }
    const numeroMartes = () => {
        numeroDiaMartes = numeroDiaLunes + 1;
        return numeroDiaMartes;
    }
    const numeroMiercoles = () => {
        numeroDiaMiercoles = numeroDiaLunes + 2;
        return numeroDiaMiercoles;
    }
    const numeroJueves = () => {
        numeroDiaJueves = numeroDiaLunes + 3;
        return numeroDiaJueves;
    }
    const numeroViernes = () => {
        numeroDiaViernes = numeroDiaLunes + 4;
        return numeroDiaViernes ;
    }

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Cargar hora
                    </Typography>
                        </Grid>
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item xs>
                                {<Fragment>
                                    <Card className={classes.root} variant="outlined" >
                                        <Typography variant="h5" component="h2" align = 'center'>
                                            Lunes
                                         </Typography>
                                         <Typography variant="h5" component="h2" align = 'center'>
                                            {numeroLunes()}
                                         </Typography>
                                        <FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeCategory}
                                            >
                                            <MenuItem value="proyecto">Proyectos</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="soporte">Soporte</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="estudio">Estudio</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {category === 'proyecto' &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            defaultValue={proyecto}
                                            value={proyecto}
                                            onChange={handleChangeProyecto}
                                            >
                                            {proyectos && proyectos.map(proyecto =>(
                                                <MenuItem onClick={() => {setTaskId(null);console.log(taskId)}}value={proyecto.id}>{proyecto.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        {category === 'proyecto' && proyecto &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeTarea}
                                            defaultValue={taskId}
                                            value={taskId}
                                            >
                                            {tasks && tasks.map(tarea =>(
                                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}

                                        <TextField type="number"  className={classes.campo}label='Horas'onChange={(e) => setHours(e.target.value)}
                                        />
                                        
                                        <DatePicker
                                            selected={date}
                                            onChange={date => setDate(date)}
                                            customInput={<TextField className={classes.campo}label='Fecha de hora'onChange={(e) => setDate(e.target.value)}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <Button style={{marginTop:"40px"}}onClick={() => { onCrear() }} color="secondary" variant='outlined'>
                                            Cargar hora
                                        </Button>
                                    </Card>
                                </Fragment>}
                                
                            </Grid>
                            <Grid item xs>
                                {<Fragment>
                                    <Card className={classes.root} variant="outlined" width="25%">
                                        <Typography variant="h5" component="h2" align = 'center'>
                                            Martes
                                            </Typography>
                                            <Typography variant="h5" component="h2" align = 'center'>
                                            {numeroMartes()}
                                         </Typography>
                                        <FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeCategory}
                                            >
                                            <MenuItem value="proyecto">Proyectos</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="soporte">Soporte</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="estudio">Estudio</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {category === 'proyecto' &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            defaultValue={proyecto}
                                            value={proyecto}
                                            onChange={handleChangeProyecto}
                                            >
                                            {proyectos && proyectos.map(proyecto =>(
                                                <MenuItem onClick={() => {setTaskId(null);console.log(taskId)}}value={proyecto.id}>{proyecto.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        {category === 'proyecto' && proyecto &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeTarea}
                                            defaultValue={taskId}
                                            value={taskId}
                                            >
                                            {tasks && tasks.map(tarea =>(
                                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        <TextField type="number" className={classes.campo}label='Horas'onChange={(e) => setHours(e.target.value)}
                                        />
                                        
                                        <DatePicker
                                            selected={date}
                                            onChange={date => setDate(date)}
                                            customInput={<TextField className={classes.campo}label='Fecha de hora'onChange={(e) => setDate(e.target.value)}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <Button style={{marginTop:"40px"}}onClick={() => { onCrear() }} color="secondary" variant='outlined'>
                                            Cargar hora
                                        </Button>
                                    </Card>
                                </Fragment>}
                            </Grid>
                            <Grid item xs>
                                {<Fragment>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography variant="h5" component="h2" align = 'center'>
                                            Miércoles
                                            </Typography>
                                            <Typography variant="h5" component="h2" align = 'center'>
                                            {numeroMiercoles()}
                                         </Typography>
                                        <FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeCategory}
                                            >
                                            <MenuItem value="proyecto">Proyectos</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="soporte">Soporte</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="estudio">Estudio</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {category === 'proyecto' &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            defaultValue={proyecto}
                                            value={proyecto}
                                            onChange={handleChangeProyecto}
                                            >
                                            {proyectos && proyectos.map(proyecto =>(
                                                <MenuItem onClick={() => {setTaskId(null);console.log(taskId)}}value={proyecto.id}>{proyecto.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        {category === 'proyecto' && proyecto &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeTarea}
                                            defaultValue={taskId}
                                            value={taskId}
                                            >
                                            {tasks && tasks.map(tarea =>(
                                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        <TextField type="number" className={classes.campo}label='Horas'onChange={(e) => setHours(e.target.value)}
                                        />
                                        
                                        <DatePicker
                                            selected={date}
                                            onChange={date => setDate(date)}
                                            customInput={<TextField className={classes.campo}label='Fecha de hora'onChange={(e) => setDate(e.target.value)}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <Button style={{marginTop:"40px"}}onClick={() => { onCrear() }} color="secondary" variant='outlined'>
                                            Cargar hora
                                        </Button>
                                    </Card>
                                </Fragment>}
                            </Grid>
                            <Grid item xs>
                                {<Fragment>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography variant="h5" component="h2" align = 'center'>
                                            Jueves
                                            </Typography>
                                            <Typography variant="h5" component="h2" align = 'center'>
                                            {numeroJueves()}
                                         </Typography>
                                        <FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeCategory}
                                            >
                                            <MenuItem value="proyecto">Proyectos</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="soporte">Soporte</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="estudio">Estudio</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {category === 'proyecto' &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            defaultValue={proyecto}
                                            value={proyecto}
                                            onChange={handleChangeProyecto}
                                            >
                                            {proyectos && proyectos.map(proyecto =>(
                                                <MenuItem onClick={() => {setTaskId(null);console.log(taskId)}}value={proyecto.id}>{proyecto.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        {category === 'proyecto' && proyecto &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeTarea}
                                            defaultValue={taskId}
                                            value={taskId}
                                            >
                                            {tasks && tasks.map(tarea =>(
                                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        <TextField type="number" className={classes.campo}label='Horas'onChange={(e) => setHours(e.target.value)}
                                        />
                                        
                                        <DatePicker
                                            selected={date}
                                            onChange={date => setDate(date)}
                                            customInput={<TextField className={classes.campo}label='Fecha de hora'onChange={(e) => setDate(e.target.value)}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <Button style={{marginTop:"40px"}}onClick={() => { onCrear() }} color="secondary" variant='outlined'>
                                            Cargar hora
                                        </Button>
                                    </Card>
                                </Fragment>}
                            </Grid>
                            <Grid item xs>
                                {<Fragment>
                                    <Card className={classes.root} variant="outlined">
                                        <Typography variant="h5" component="h2" align = 'center'>
                                            Viernes
                                            </Typography>
                                            <Typography variant="h5" component="h2" align = 'center'>
                                            {numeroViernes()}
                                         </Typography>
                                        <FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Categoría</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeCategory}
                                            >
                                            <MenuItem value="proyecto">Proyectos</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="soporte">Soporte</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="estudio">Estudio</MenuItem>
                                            <MenuItem onClick={() => {setProyecto(null);setTaskId(null);}} value="fuera de oficina">Trabajo fuera de oficina</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {category === 'proyecto' &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Proyecto</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            defaultValue={proyecto}
                                            value={proyecto}
                                            onChange={handleChangeProyecto}
                                            >
                                            {proyectos && proyectos.map(proyecto =>(
                                                <MenuItem onClick={() => {setTaskId(null);console.log(taskId)}}value={proyecto.id}>{proyecto.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        {category === 'proyecto' && proyecto &&<FormControl className={classes.formControl} style={{width:"100%"}}>
                                            <InputLabel id="demo-controlled-open-select-label">Tarea</InputLabel>
                                            <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onChange={handleChangeTarea}
                                            defaultValue={taskId}
                                            value={taskId}
                                            >
                                            {tasks && tasks.map(tarea =>(
                                                <MenuItem value={tarea.id}>{tarea.nombre}</MenuItem>

                                            ))
                                            }
                                            </Select>
                                        </FormControl>}
                                        <TextField type="number" className={classes.campo}label='Horas'onChange={(e) => setHours(e.target.value)}
                                        />
                                        
                                        <DatePicker
                                            selected={date}
                                            onChange={date => setDate(date)}
                                            customInput={<TextField className={classes.campo}label='Fecha de hora'onChange={(e) => setDate(e.target.value)}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                        <Button style={{marginTop:"40px"}}onClick={() => { onCrear() }} color="secondary" variant='outlined'>
                                            Cargar hora
                                        </Button>
                                    </Card>
                                </Fragment>}
                            </Grid>
                            <div className={classes.nuevoEmpleado}>
                                    <Button  style={{marginBottom:"20px", marginLeft:"40px", color: "red"}}onClick={() => {history.push('/recursos/'+id) }} color='error' variant='outlined' >
                                        Cancelar
                                    </Button>
                                </div>
                        </Grid>

                    </Grid>
                </Paper>
            </AnimatedRoute>
            
        </AnimatedSwitch>
    )
}