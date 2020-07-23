import React, { useEffect, useState, Fragment, useContext } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useRouteMatch } from "react-router";
import axios from "axios";
import ModificarEmpleado from "recursos/empleados/ModificarEmpleado"
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {useHistory} from "react-router";
import ConfirmacionContext from "contexts/ConfirmacionContext";
import Modal from "@material-ui/core/Modal";


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
          <h2 id="simple-modal-title">Usted está por eliminar un empleado.</h2>
          <h3 id="simple-modal-description">
            ¿Desea eliminarlo?
          </h3>
          <Modal />
          <Button  style={{marginLeft:"20px", color:"red"}}onClick={ () => {onEliminar()}} color='error' variant='outlined'>
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
                            {empleado &&<Typography variant='h4'>
                                {empleado.name + " "+ empleado.surname}
                    </Typography>}
                        </Grid>
                        <Grid item container spacing={6} xs={12}>
                            <Grid item xs={12} md={6}>
                                {empleado && <Fragment>
                                    <Typography>
                                        DNI: {empleado.dni}
                                    </Typography>
                                    <Typography>
                                        Fecha de nacimiento: {parseFecha(empleado.date_birth.toString())}
                                    </Typography>
                                    <Typography>
                                        Legajo: {empleado.organization_id}
                                    </Typography>
                                    <Typography>
                                        Fecha de contratación: {parseFecha(empleado.date_hire.toString())}
                                    </Typography>
                                    <Typography>
                                        Contrato: {empleado.contract ==='F'? "Full time":"Part time"}
                                    </Typography>
                                    <Typography>
                                        Puesto: {empleado.pos}
                                    </Typography>
                                </Fragment>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <Comentarios mostrar={Boolean(ticket)}/> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Acciones mostrar={Boolean(ticket)}/> */}
                        </Grid>
                    </Grid>
                    <div className={classes.nuevoEmpleado}>
                <Button color='secondary' variant='outlined' to={`${url}/modificacion`} component={Link}>
                    Modificar
                </Button>
                
                {/* <Button  style={{marginLeft:"40px"}}onClick={ () => {onEliminar()}} color='secondary' variant='contained'>
                    Eliminar
                </Button> */}
                <Button type="button" style={{marginLeft:"40px", color:"red"}}onClick={handleOpen} color='error' variant='outlined'>
                    Eliminar
                </Button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
                </Modal>

                <Button  style={{marginLeft:"40%"}} color='secondary' variant='contained' component={Link} disabled>
                    Ver horas cargadas
                </Button>
                <Button  style={{marginLeft:"40px"}} color='secondary' variant='contained' component={Link} disabled>
                    Cargar horas
                </Button>
                </div>
                </Paper>
                
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarEmpleado/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
