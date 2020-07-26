import React, { Fragment, useState } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import BotonVolver from "proyectos/common/BotonVolver";
import Proyecto from 'proyectos/Proyecto'
//import AgregarProyecto from 'proyectos/AgregarProyecto';
//import CrearProyecto from 'proyectos/EditarProyecto';
//import VerProyecto from 'proyectos/ver/VerProyecto';
import axios from "axios";
import {useHistory} from "react-router";
import ProyectoDetails from "proyectos/ver/ProyectoDetalles";

export default ({path, idProyecto}) => {
  const history = useHistory();
  const [fase, setFase] = useState();

  const mapFases = (fase) => (
    <Proyecto proyecto={fase} key={fase.id}/>
  )

  return (
    <ContentWrapper>
      <AnimatedSwitch>
            <AnimatedRoute exact path={ `${path}/fases`}>
                <Fragment>
                <BotonVolver></BotonVolver>
                {<VistaListado url = {'/proyectos/'+idProyecto+"/fases"} mapf = {mapFases}></VistaListado>}
                </Fragment>
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}`+"/fases/crear"}>
                <BotonVolver></BotonVolver>
                crear fase
            </AnimatedRoute>
            <AnimatedRoute exact path={`${path}`+"/fases/:id(\\d+)"}>
                <BotonVolver></BotonVolver>
                verFase
            </AnimatedRoute>
        </AnimatedSwitch>
     </ContentWrapper>
  )
};




