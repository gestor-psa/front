import React, { useEffect, useState, Fragment, useContext } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useRouteMatch } from "react-router";
import axios from "axios";
import ModificarEmpleado from "recursos/empleados/ModificarEmpleado"
import CargarHora from "recursos/empleados/CargarHora"
// import HorasCargadas from "recursos/empleados/HorasCargadas"
import HorasCargadasGraficoAlternativo from "recursos/empleados/HorasCargadasGraficoAlternativo"
import HorasCargadasGrafico from "recursos/empleados/HorasCargadasGrafico"
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {useHistory} from "react-router";
import ConfirmacionContext from "contexts/ConfirmacionContext";
import Modal from "@material-ui/core/Modal";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WarningIcon from '@material-ui/icons/Warning';
import HorasPorMesGrafico from "recursos/empleados/HorasPorMesGrafico"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';


// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//      if ((new Date().getTime() - start) > milliseconds) {
//       break;
//      }
//     }
// }

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

// /empleados
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    },
    skeleton: {
        left: 0,
        bottom: 0,
        width: '60%',
        '& td': {
            width: '100%'
        },
        '& tr': {
            display: 'flex'
        }
    },
    skeletonDerecha: {
        left: 0,
        bottom: 0,
        width: '80%',
        '& td': {
            width: '100%'
        },
        '& tr': {
            display: 'flex'
        }
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
const parseFecha = (fecha) => {
    return fecha.slice(6,8) + "/" + fecha.slice(4,6) + "/" + fecha.slice(0,4);
}


export default () => {
    const classes = useStyles();
    const { id } = useParams();
    const { path } = useRouteMatch() || {};
    const { url } = useRouteMatch() || {};
    const [empleado, setEmpleado] = useState();
    const {setMostrar, setMensaje} = useContext(ConfirmacionContext);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={1} alignItems="center" justify="center" >
            <Grid item container xs={12} justify="center">
                <h2 id="simple-modal-title">Usted está por eliminar un empleado</h2>
            </Grid>
            <Grid item>
                <WarningIcon style={{ color: 'red', fontSize: 50}}/>
            </Grid>
            <Grid item>
                <h3 id="simple-modal-description">Esta acción no puede ser deshecha</h3>
            </Grid>
            <Grid item container xs={12} justify="center">
                <h3 id="simple-modal-description">¿Desea eliminarlo?</h3>
            </Grid>
        </Grid>
          <Modal />
          <Button  style={{marginLeft:"20px", color:"red"}}onClick={ () => {onEliminar()}} color='inherit' variant='outlined'>
                    Eliminar
            </Button>
            <Button  style={{marginLeft:"80px"}}onClick={handleClose} color='secondary' variant='outlined'>
                    Cancelar
            </Button>
        </div>
      );

    const onEliminar = () => {
        axios.delete(process.env.REACT_APP_URL_RECURSOS + '/employees/' + empleado.dni)
            .then(res => {
                    history.push(`/recursos`)
                    setMensaje('Empleado eliminado');
                    setMostrar(true); 
                }).catch(error => {
                // TODO.
                console.log(error.response);
            });    
        
    }    

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_RECURSOS + '/employees/' + id)
            .then(res => {
                setEmpleado(res.data);
            })
        // setEmpleado({"dni":41204123,"name":"Ignacio","surname":"Nitz","organization_id":"100710","pos":"Jefe","date_birth":19900425,"date_hired":20100427});
    }, [id]);

    return (

        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Paper className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ArrowBackIcon style={{color:"1fc71f", cursor:"pointer"}} fontSize="large" onClick={() => {history.push('/recursos/') }}/>
                        </Grid>
                        <Grid item xs={12}>
                            {empleado &&<Typography variant='h4'>
                                {empleado.name + " "+ empleado.surname}
                            </Typography>}
                        </Grid>
                        <Grid item container spacing={6} xs={12} alignItems="center" justify="baseline">
                            <Grid item xs>
                                {(!empleado)?
                                <TableContainer className={classes.skeleton}>
                                    <Table className={classes.table} style={{marginBottom:'40px'}}>
                                        <TableBody>
                                            {Array(1).fill(null).map((n, keyN) => (
                                                <TableRow key={keyN}>
                                                    {Array(1).fill(null).map((m, keyM) => (
                                                        <TableCell key={keyM}><Skeleton/></TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            {Array(4).fill(null).map((n, keyN) => (
                                                <TableRow key={keyN}>
                                                    {Array(1).fill(null).map((m, keyM) => (
                                                        <TableCell key={keyM}><Skeleton/></TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <Fragment>
                                    <Typography>
                                        <b>DNI:</b> {empleado.dni}
                                    </Typography>
                                    <Typography>
                                        <b>Fecha de nacimiento:</b> {parseFecha(empleado.date_birth.toString())}
                                    </Typography>
                                    <Typography>
                                        <b>Legajo:</b> {empleado.organization_id}
                                    </Typography>
                                    <Typography>
                                        <b>Fecha de contratación:</b> {parseFecha(empleado.date_hire.toString())}
                                    </Typography>
                                    <Typography>
                                        <b>Antigüedad:</b> {Math.floor(((new Date().getFullYear() - Math.floor(empleado.date_hire/10000))*12 + ((new Date().getMonth() +1) - Math.floor((empleado.date_hire%10000)/100)))/12)} años {Math.floor(((new Date().getFullYear() - Math.floor(empleado.date_hire/10000))*12 + ((new Date().getMonth() +1) - Math.floor((empleado.date_hire%10000)/100)))%12)} meses
                                    </Typography>
                                    <Typography>
                                        <b>Contrato:</b> {empleado.contract ==='F'? "Full time":"Part time"}
                                    </Typography>
                                    <Typography>
                                        <b>Puesto:</b> {empleado.pos}
                                    </Typography>
                                </Fragment>}
                            </Grid>
                            {(!empleado)?
                            <Grid item xs={6} md={6}>
                                <Skeleton style={{height:'350px'}}/>
                            </Grid>
                            :
                            <Grid item container xs alignItems="center" justify="center">
                                <HorasPorMesGrafico  contrato={empleado.contract}/>
                            </Grid>
                            }
                            
                        </Grid>
                        <Grid item container spacing={3} direction="row" xs={12} justify="space-between">
                            <Grid item container spacing={3} xs={6} justify="flex-start">
                                <Grid item>
                                    <Button color='secondary' variant='outlined' to={`${url}/modificacion`} component={Link}>
                                        Modificar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" style={// eslint-disable-next-line 
                                    {color: (id == 45487954)? "grey": "red"}}onClick={handleOpen} color='inherit' variant='outlined' disabled={// eslint-disable-next-line
                                        id == 45487954}>
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3} xs={6} justify="center">
                                <Grid item >
                                    <Button color='secondary' variant='outlined' to={`${url}/horascargadasgraficoalternativo`} component={Link} >
                                        Ver horas cargadas
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Button  color='secondary' variant='outlined' to={`${url}/cargarhora`} component={Link}>
                                        Cargar horas
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                <div className={classes.nuevoEmpleado}>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    {body}
                    </Modal>
                </div>
                </Paper>
    
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/cargarhora`}>
                <CargarHora/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarEmpleado/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/horascargadasgraficoAlternativo`}>
                <HorasCargadasGraficoAlternativo/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/horascargadasgrafico`}>
                <HorasCargadasGrafico/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
