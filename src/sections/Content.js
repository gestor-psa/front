import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from 'views/Home';
import Projects from 'views/Projects';
import Soporte from 'views/Soporte';
import Recursos from 'views/Recursos';
import NotFound from 'views/NotFound';
import {Redirect, useLocation} from "react-router";
import Animation from "app/Animation";


const content = [{
    label: 'Proyectos',
    route: '/proyectos',
    Component: Projects
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
    const location = useLocation();

    return (
        <Animation location={location}>
            <Switch location={location}>
                {/* Solución automágica para lidiar con las trailing slashes
                (https://github.com/ReactTraining/react-router/issues/4841) */}
                <Route exact strict path="(.*//+.*)" render={({location}) =>
                    <Redirect to={location.pathname.replace(/\/\/+/g, '/')}/>}
                />
                <Route exact path='/'>
                    <Home/>
                </Route>
                {content.map(({label, route, Component}, key) =>
                    <Route path={route} key={key}>
                        <Component/>
                    </Route>
                )}
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </Animation>
    )
}

export {content};
