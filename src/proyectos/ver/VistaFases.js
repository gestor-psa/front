import React, { Fragment } from 'react';
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import BotonVolver from "proyectos/common/BotonVolver";
import Proyecto from 'proyectos/Proyecto'
//import AgregarProyecto from 'proyectos/AgregarProyecto';
//import CrearProyecto from 'proyectos/EditarProyecto';
//import VerProyecto from 'proyectos/ver/VerProyecto';
/*import axios from "axios";
import {useHistory} from "react-router";
import ProyectoDetails from "proyectos/ver/PantallaDetallesElemento";*/

export default ({idProyecto}) => {
 // const history = useHistory();
  //const [fase, setFase] = useState();
  const { path } = useRouteMatch() || {};

  const mapFases = (fase) => (
    <Proyecto proyecto={fase} key={fase.id || fase.codigo}/>
  )
console.log(path)
  return (
      <AnimatedSwitch>
            <AnimatedRoute exact path={ `${path}`}>
                <Fragment>
                <BotonVolver></BotonVolver>
                {<VistaListado url = {'/proyectos/'+idProyecto+"/fases"} mapf = {mapFases}></VistaListado>}
                </Fragment>
            </AnimatedRoute>
            <AnimatedRoute  path={`${path}/crear`}>
                <BotonVolver></BotonVolver>
                crear fase
            </AnimatedRoute>
            <AnimatedRoute  path={`${path}/:id(\\d+)`}>
                <BotonVolver></BotonVolver>
                verFase
            </AnimatedRoute>
        </AnimatedSwitch>
  )
};




