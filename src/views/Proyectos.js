import React, { Fragment } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import Proyecto from 'proyectos/Proyecto'
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/EditarProyecto';
import VerProyecto from 'proyectos/ver/VerProyecto';

export default () => {
  const { path } = useRouteMatch() || {};

  const mapProyecto = (proyecto) => (
    <Proyecto proyecto={proyecto} key={proyecto.id}/>
  )

  return (
    <ContentWrapper>
      <AnimatedSwitch>
            <AnimatedRoute exact path={path}>
                <Fragment>
                    <AgregarProyecto />
                    <VistaListado mapf = {mapProyecto} url = '/proyectos' />
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
