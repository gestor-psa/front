import React, { Fragment, useEffect, useState} from 'react';
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
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useParams} from "react-router";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from "@material-ui/core/Modal";
import WarningIcon from '@material-ui/icons/Warning';
import Button from "@material-ui/core/Button";



const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    nuevaHora: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: "50px"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const parseFecha = (fecha) => {
    return fecha.slice(6,8) + "/" + fecha.slice(4,6) + "/" + fecha.slice(0,4);
}

export default () => {
    const [horas, setHoras] = useState();
    const [horasFiltradas, setHorasFiltradas] = useState();
    const { id } = useParams();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [idHoraAEliminar, setIdHoraAEliminar] = React.useState();
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = (id) => {
        setOpen(true);
        setIdHoraAEliminar(id);
        console.log(id);
        console.log(idHoraAEliminar);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={1} alignItems="center" justify="center" >
            <Grid item container xs={12} justify="center">
                <h2 id="simple-modal-title">Usted está por eliminar una hora cargada</h2>
            </Grid>
            <Grid item>
                <WarningIcon style={{ color: 'red', fontSize: 50}}/>
            </Grid>
            <Grid item>
                <h3 id="simple-modal-description">Esta acción no puede ser deshecha</h3>
            </Grid>
            <Grid item container xs={12} justify="center">
                <h3 id="simple-modal-description">¿Desea eliminarla?</h3>
            </Grid>
        </Grid>
          <Modal />
          <Button  style={{marginLeft:"20px", color:"red"}} onClick={ () => {onEliminar()}} color='inherit' variant='outlined'>
                    Eliminar
            </Button>
            <Button  style={{marginLeft:"80px"}}onClick={handleClose} color='secondary' variant='outlined'>
                    Cancelar
            </Button>
        </div>
    );

    
    const onEliminar = () => {
        console.log(idHoraAEliminar);
        axios.delete(process.env.REACT_APP_URL_RECURSOS + '/hours/' + idHoraAEliminar)
            .then(res => {
                handleClose();
                setIdHoraAEliminar(null);
                window.location.reload();
                }).catch(error => {
                // TODO.
        });    
        console.log(idHoraAEliminar);
    } 

    const handleChange = (event) => {
        let categoria = event.target.value;

        switch(categoria){
            case "todo":
                setHorasFiltradas(horas);
                break;
            case "soporte":
                setHorasFiltradas(horas.filter(a=>a.category === 'soporte'));
                break;
            case "estudio":
                setHorasFiltradas(horas.filter(a=>a.category === 'estudio'));
                break;
            case "proyecto":
                setHorasFiltradas(horas.filter(a=>a.category === 'proyecto'));
                break;
            case "fuera de oficina":
                setHorasFiltradas(horas.filter(a=>a.category === 'fuera de oficina'));
                break;
            default:
                break;
        }
      
    };

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/hours/' + id)
            .then(res => {
                let promises = [];
                let horass = [];

                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].category==='proyecto'){
                        promises.push(axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + res.data[i].projectId + '/tareas/' + res.data[i].taskId));
                        promises.push(axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/' + res.data[i].projectId));
                        horass.push(res.data[i]);
                        horass.push(res.data[i]);
                    }
                }
                axios.all(promises)
                    .then(axios.spread((...args) => {
                        for (let i = 0; i < args.length; i+=2) {
                            horass[i].taskName = args[i].data.nombre;
                            horass[i].projectName = args[i+1].data.nombre;
                        }
                        setHoras(res.data.reverse());
                        setHorasFiltradas(res.data);
                    }))
                    .then(/* use the data */);
                console.log(res)
            })
            .catch(error => {
                // TODO.
            })
    }, [id]);


    return (
        <Fragment>
                {
                (!horasFiltradas)?
                <TableContainer component={Paper} className={classes.skeleton} style={{marginTop:'60px'}}>
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
                <Fragment>
                <Grid container spacing={3} direction="row" justify="space-between" style={{marginTop:'20px'}}>
                    {/* <Grid item xs={12}>
                        <ArrowBackIcon style={{color:"1fc71f"}} fontSize="large" onClick={() => {history.push('/recursos/'+id) }}/>
                    </Grid> */}
                    <Grid item>
                        {horasFiltradas&&<FormControl className={classes.formControl}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={categoria}
                            onChange={handleChange}
                            style = {{minWidth:'120px'}}
                            >
                            <MenuItem value = {"todo"}>
                                <em>Todas</em>
                            </MenuItem>
                            <MenuItem value={'proyecto'}>Proyecto</MenuItem>
                            <MenuItem value={'soporte'}>Soporte</MenuItem>
                            <MenuItem value={'fuera de oficina'}>Fuera de oficina</MenuItem>
                            <MenuItem value={'estudio'}>Estudio</MenuItem>
                            </Select>
                        </FormControl>}
                    </Grid>  
                </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            {/* <TableCell>Legajo</TableCell> */}
                            <TableCell>Categoría</TableCell>
                            <TableCell>Nombre de proyecto</TableCell>
                            <TableCell>Tarea #</TableCell>
                            <TableCell>Nombre de tarea</TableCell>
                            <TableCell>Horas</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {horasFiltradas && horasFiltradas.map(hora => (
                            <TableRow>
                                <TableCell>{parseFecha(hora.date.toString())}</TableCell>
                                {/* <TableCell>{empleado.organization_id}</TableCell> */}
                                <TableCell>{hora.category[0].toUpperCase() + hora.category.slice(1)}</TableCell>
                                <TableCell>{hora.category === 'proyecto' ? hora.projectName : '---'}</TableCell>
                                <TableCell>{hora.category === 'proyecto' ? hora.taskId : '---'}</TableCell>
                                <TableCell>{hora.category === 'proyecto' ? hora.taskName : '---'}</TableCell>
                                <TableCell>{hora.hours}</TableCell>
                                <TableCell>
                                    <DeleteForeverIcon style={{color:'red', cursor:"pointer"}} onClick={()=>handleOpen(hora.id)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.nuevoEmpleado}>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {idHoraAEliminar && body}
                </Modal>
            </div>
            </Fragment>
            }
        </Fragment>
    );
}
