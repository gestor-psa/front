import React, { Fragment } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import ListadoProyectos from 'proyectos/ListadoProyectos';
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/CrearProyecto';
import VerProyecto from 'proyectos/ver/VerProyecto';

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
                <CrearProyecto titulo = "Crear Proyecto" />
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <VerProyecto />
            </AnimatedRoute>
        </AnimatedSwitch>
     </ContentWrapper>
  )
};
