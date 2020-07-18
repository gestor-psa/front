import React, {useEffect} from 'react';
import {useParams, useRouteMatch} from "react-router";
import VerTicket from "soporte/tickets/ver/VerTicket";
import axios from "axios";
import ModificarTicket from "soporte/tickets/modificar/ModificarTicket";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

// /tickets
export default ({ticket, onTicketChange}) => {
    const {id} = useParams();
    const {path} = useRouteMatch() || {};

    useEffect(() => {
        !ticket && id && axios.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + id)
            .then(res => {
                onTicketChange(res.data);
            })
    }, [ticket, onTicketChange, id]);

    return (
        <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <VerTicket ticket={ticket}/>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}/modificacion`}>
                <ModificarTicket ticket={ticket} onTicketChange={onTicketChange}/>
            </AnimatedRoute>
        </AnimatedSwitch>
    )
}
