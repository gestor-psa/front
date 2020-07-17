import React, { Fragment } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import ListadoProyectos from 'proyectos/ListadoProyectos';
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/CrearProyecto';
import OverviewProyecto from 'proyectos/VerProyecto';

export default () => {
  const { path } = useRouteMatch() || {};

  return (
    <ContentWrapper>
      <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Fragment>
                    <AgregarProyecto />
                    <ListadoProyectos />
                </Fragment>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/crear`}>
                <CrearProyecto />
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <OverviewProyecto />
            </AnimatedRoute>
        </AnimatedSwitch>
     </ContentWrapper>
  )
};
