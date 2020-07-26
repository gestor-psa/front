import React from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import {useRouteMatch} from "react-router";
import TicketsMain from "soporte/tickets/Main";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import ClientesMain from "soporte/clientes/Main";
import Dashboard from "soporte/dashboard/Dashboard";


export default () => {
    const {path} = useRouteMatch() || {};

    return (
        <ContentWrapper>
            <AnimatedSwitch>
                <AnimatedRoute exact path={path}>
                    <Dashboard/>
                </AnimatedRoute>
                <AnimatedRoute path={`${path}/tickets`}>
                    <TicketsMain/>
                </AnimatedRoute>
                <AnimatedRoute path={`${path}/clientes`}>
                    <ClientesMain/>
                </AnimatedRoute>
            </AnimatedSwitch>
        </ContentWrapper>
    )
}
