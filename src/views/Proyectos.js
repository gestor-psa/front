import React, { Fragment, useState } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import Proyecto from 'proyectos/Proyecto'
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/PantallaEdicionElemento';
import VerProyecto from 'proyectos/ver/VerProyecto';
import axios from "axios";
import {useHistory} from "react-router";
import VistaFases from 'proyectos/ver/VistaFases'

export default () => {
  const { path } = useRouteMatch() || {};
  const history = useHistory();
  const [proyecto, setProyecto] = useState({});

  const mapProyecto = (proyecto) => (
    <Proyecto proyecto={proyecto} key={proyecto.id || proyecto.codigo}/>
  )

  const onConfirm = (data) => {
    axios.post(process.env.REACT_APP_URL_PROYECTOS + '/proyectos', data)
        .then((result) => {
            history.push(`/proyectos/${result.data.id}`)
            console.log(result);
        })
        .catch(error => {
            // TODO.
        console.log(error.response);
    });
  };

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
                <CrearProyecto titulo = "Crear Proyecto" onConfirm = {onConfirm} />
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <VerProyecto proyecto = {proyecto} setProyecto = {setProyecto} />
            </AnimatedRoute>

            <AnimatedRoute  path={ `${path}/:id(\\d+)/fases`}>
                <VistaFases path = {path} idProyecto = {proyecto.id || proyecto.codigo}></VistaFases>
            </AnimatedRoute>

        </AnimatedSwitch>
     </ContentWrapper>
  )
};
