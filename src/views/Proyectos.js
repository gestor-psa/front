import React, { Fragment, useState } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import ElementoRouter from "proyectos/common/ElementoRouter";

export default () => {
  const { path } = useRouteMatch() || {};
  const [proyecto, setProyecto] = useState({});
  const [fase, setFase] = useState({});
  const [ite, setIte] = useState({});
  const [tarea, setTarea] = useState({});

  const GetId = (elem) => {return (elem.id || elem.codigo)};

  return (
    <ContentWrapper>
      <AnimatedSwitch>

          <AnimatedRoute path={path}>
              <Fragment>
                  <ElementoRouter elem = {proyecto} setElem = {setProyecto} prefix = "Nuevo" elemType = "Proyecto"
                   url = {"/proyectos"} isProyecto = {true} id = {proyecto.id}>
                  </ElementoRouter>
              </Fragment>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/fases`}>
                <ElementoRouter elem = {fase} setElem = {setFase} elemType = "Fase" 
                url = {"/proyectos/"+GetId(proyecto)+"/fases"} isFase = {proyecto}
                urlReturn = {"/proyectos/"+GetId(proyecto)} id = {fase.id}
                >
                </ElementoRouter>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/tareas`}>
                <ElementoRouter elem = {tarea} setElem = {setTarea} elemType = "Tarea"
                url = {"/proyectos/"+GetId(proyecto)+"/tareas"} isTarea = {proyecto}
                urlReturn = {"/proyectos/"+GetId(proyecto)} id = {tarea.id}
                >
                </ElementoRouter>
          </AnimatedRoute>

          <AnimatedRoute  path={ `${path}/:id(\\d+)/fases/:id(\\d+)/iteraciones`}>
                <ElementoRouter elem = {ite} setElem = {setIte} elemType = "Iteración" suffix = "es"
                url = {"/proyectos/"+GetId(proyecto)+"/fases/"+GetId(fase)+"/iteraciones"} 
                isIteracion = {proyecto} isFase = {fase} id = {ite.id}
                urlReturn = {"/proyectos/"+GetId(proyecto)+"/fases/"+GetId(fase)}
                >
                </ElementoRouter>
          </AnimatedRoute>

        </AnimatedSwitch>
     </ContentWrapper>
  )
};
