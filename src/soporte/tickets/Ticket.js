import React, {useEffect, useState} from 'react';
import {Route, useParams, useRouteMatch} from "react-router";
import VerTicket from "soporte/tickets/VerTicket";
import axios from "axios";
import ModificarTicket from "soporte/tickets/ModificarTicket";
import NotFoundSwitch from "components/common/NotFoundSwitch";

// /tickets
export default () => {
    const {id} = useParams();
    const {path} = useRouteMatch();
    const [ticket, setTicket] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then(res => {
                setTicket(res.data);
            })
    }, [id]);

    return (
        <NotFoundSwitch>
            <Route exact path={path}>
                <VerTicket ticket={ticket}/>
            </Route>
            <Route exact path={`${path}/modificacion`}>
                <ModificarTicket/>
            </Route>
        </NotFoundSwitch>
    )
}
