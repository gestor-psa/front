import ListarTickets from "recursos/empleados/ListarEmpleados";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useRouteMatch} from "react-router";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    acciones: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3)
    }
}));

export default () => {
    const classes = useStyles();
    const {url} = useRouteMatch() || {};

    return (
        <Fragment>
            <ListarTickets/>
            <div className={classes.acciones}>
                <Button
                    color='secondary'
                    variant='contained'
                    to={`${url}/creacion`}
                    component={Link}
                >
                    Nuevo empleado
                </Button>
            </div>
        </Fragment>
    )
}
