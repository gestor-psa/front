import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from 'views/Home';
import Projects from 'views/Projects';
import WorkExperience from 'views/WorkExperience';
import NotFound from 'views/NotFound';
import {useLocation} from "react-router";
import Animation from "app/Animation";


const content = [{
    label: 'Proyectos',
    route: '/proyectos',
    Component: Projects
}, {
    label: 'Experiencia laboral',
    route: '/experiencia_laboral',
    Component: WorkExperience
}];

export default () => {
    let location = useLocation();

    return (
        <Animation location={location}>
            <Switch location={location}>
                <Route exact path='/'>
                    <Home/>
                </Route>
                {content.map(({label, route, Component}, key) =>
                    <Route exact path={route} key={key}>
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
