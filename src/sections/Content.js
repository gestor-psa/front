import React from 'react';
import {Route} from 'react-router-dom';

import Home from 'views/Home';
import Proyectos from 'views/Proyectos';
import Soporte from 'views/Soporte';
import Recursos from 'views/Recursos';
import {Redirect} from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";


const content = [{
    label: 'Proyectos',
    route: '/proyectos',
    Component: Proyectos
}, {
    label: 'Soporte',
    route: '/soporte',
    Component: Soporte
}, {
    label: 'Recursos',
    route: '/recursos',
    Component: Recursos
}];

export default () => {

    return (
        <>
            {/* Solución automágica para lidiar con las trailing slashes
                (https://github.com/ReactTraining/react-router/issues/4841) */}
            <Route exact strict path="(.*//+.*)" render={({location}) =>
                <Redirect to={location.pathname.replace(/\/\/+/g, '/')}/>}
            />

            <AnimatedSwitch>
                <AnimatedRoute exact path='/'>
                    <Home/>
                </AnimatedRoute>
                {content.map(({label, route, Component}, key) =>
                    <AnimatedRoute path={route} key={key}>
                        <Component/>
                    </AnimatedRoute>
                )}
            </AnimatedSwitch>
        </>
    )
}

export {content};
