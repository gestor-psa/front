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
export default () => {
    const classes = useStyles();
    const { path } = useRouteMatch() || {};
    const [dni, setDni] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [organization_id, setOrganization_id] = useState();
    const [date_birth, setDate_birth] = useState();
    const [date_hire, setDate_hire] = useState();
    const [pos, setPos] = useState();
    const history = useHistory();

    const onCrear = () => {
        // setEsperando(true);
        let empleado = {"dni":parseInt(dni,10),"name":name,"surname":surname,"organization_id":parseInt(organization_id,10),"date_birth":parseInt(date_birth,10),"date_hire":parseInt(date_hire,10),"pos":pos}
        if (!empleado.dni || !empleado.name || !empleado.surname || !empleado.organization_id || !empleado.date_birth || !empleado.date_hire || !empleado.pos){
            console.log("No hay info")
            return;
        }
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
                        <Grid item container spacing={6} xs={12}>
                            <Grid item xs={12} md={6}>
                                {<Fragment>
                                    
                                    <TextField className={classes.campo}label='DNI'onChange={(e) => setDni(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='name'onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='surname'onChange={(e) => setSurname(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Fecha de nacimiento'onChange={(e) => setDate_birth(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Legajo'onChange={(e) => setOrganization_id(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Fecha de contratación'onChange={(e) => setDate_hire(e.target.value)}
                                    />
                                    <TextField className={classes.campo}label='Puesto'onChange={(e) => setPos(e.target.value)}
                                    />
                                </Fragment>}
                                <div className={classes.nuevoEmpleado}>
                                    <Button onClick={() => { onCrear() }} color="secondary" variant='contained'>
                                Nuevo empleado
                                    </Button>
                                </div>
                            </Grid>

                        </Grid>

                    </Grid>
                </Paper>
            </AnimatedRoute>
            
        </AnimatedSwitch>
    )
}
