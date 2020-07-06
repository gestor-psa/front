import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from "react-router";
import VerTicket from "soporte/tickets/VerTicket";
import axios from "axios";
import ModificarTicket from "soporte/tickets/ModificarTicket";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default () => {
    const {id} = useParams();
    const {path} = useRouteMatch() || {};
    const [ticket, setTicket] = useState();

    useEffect(() => {
        id && axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then(res => {
                setTicket(res.data);
            })
    }, [id]);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <VerTicket ticket={ticket}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarTicket ticket={ticket} onTicketChange={t => setTicket(t)}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
