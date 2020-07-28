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
import ElementoRouter from "proyectos/common/ElementoRouter";

export default () => {
  const { path } = useRouteMatch() || {};
  const [proyecto, setProyecto] = useState({});
  const [fase, setFase] = useState({});


  return (
    <ContentWrapper>
      <AnimatedSwitch>

          <AnimatedRoute path={path}>
              <Fragment>
                  <ElementoRouter elem = {proyecto} setElem = {setProyecto} titulo = "Nuevo Proyecto"
                   url = {"/proyectos"} isProyecto = {true}>
                  </ElementoRouter>
              </Fragment>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/fases`}>
                <ElementoRouter elem = {fase} setElem = {setFase} titulo = "Nueva Fase" 
                url = {"/proyectos/"+proyecto.id+"/fases"} isFase = {proyecto}>
                </ElementoRouter>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/tareas`}>
                <ElementoRouter elem = {fase} setElem = {setFase} titulo = "Nueva Tarea" 
                url = {"/proyectos/"+proyecto.id+"/tareas"} isTarea = {proyecto}>
                </ElementoRouter>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/fases/:id(\\d+)/iteraciones`}>
                <ElementoRouter elem = {fase} setElem = {setFase} titulo = "Nueva Tarea" 
                url = {"/proyectos/"+proyecto.id+"/tareas"} 
                isIteracion = {proyecto} isFase = {fase}>
                </ElementoRouter>
          </AnimatedRoute>

        </AnimatedSwitch>
     </ContentWrapper>
  )
};
