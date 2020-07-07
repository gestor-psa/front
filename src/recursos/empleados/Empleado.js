import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from "react-router";
import VerEmpleado from "recursos/empleados/VerEmpleado";
import axios from "axios";
// import ModificarTicket from "soporte/tickets/ModificarTicket";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default () => {
    const {id} = useParams();
    const {path} = useRouteMatch() || {};
    const [empleado, setEmpleado] = useState();

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
                <VerEmpleado empleado={empleado}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>

            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
