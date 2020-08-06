import React, {  } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "proyectos/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import Proyecto from 'proyectos/Proyecto'
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/VistaEdicionElemento';
import VerElemento from 'proyectos/ver/VerElemento';
import axios from "axios";
import {useHistory} from "react-router";
import Grid from '@material-ui/core/Grid';
import BotonVolver from 'proyectos/common/BotonVolver'
import Layout from "proyectos/common/Layout"

export default ({url, elemType, prefix = "Nueva", suffix = "s", elem, setElem, isFase, isTarea, isIteracion, urlReturn}) => {
  const { path } = useRouteMatch() || {};
  const history = useHistory();
  const isProyecto = (!isFase && !isTarea && !isIteracion);
  const titulo = prefix+" "+elemType

  const [elementos, setElems] = React.useState();

  const filterTareaInIteracion = (x)=> {return !isIteracion || (x.iteracionId && x.iteracionId === elem.id)}

  const mapProyecto = (proyecto) => <Proyecto proyecto={proyecto} key={proyecto.id || proyecto.codigo} showEncargado = {isTarea || isProyecto}/>
  

  const updateElems = (useUrl, f) => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + (useUrl || url))
            .then(res => {
                setElems(res.data.filter( (elem) => {return (!f || f(elem)) && (!elem.estado || elem.estado !== "cancelado")} ));
            })
            .catch(error => {
              console.log(error.response);
            })
    }

  const onConfirm = (data) => {
    axios.post(process.env.REACT_APP_URL_PROYECTOS + url, data)
        .then((result) => {
            history.push(url + "/" + result.data.id)
            console.log(result);
        })
        .catch(error => {
            // TODO.
        console.log(error.response);
    });
  };
  const ap = <AgregarProyecto titulo = {titulo} url = {url}/>;

  return (
    <ContentWrapper>
      <AnimatedSwitch>

            <AnimatedRoute exact path={path}>
                {(urlReturn && <BotonVolver url = {urlReturn}/>)} 
                <Layout
                    titulo = {elemType+suffix}
                    ladoIzquierdo = {ap} 
                    fin ={ <VistaListado elems = {elementos} updateElems = {updateElems}  mapf = {mapProyecto} />}
                />
            </AnimatedRoute>

            <AnimatedRoute path={`${path}/crear`}>
                <CrearProyecto titulo = {titulo} onConfirm = {onConfirm} isTarea = {isTarea} isProyecto = {isProyecto} />
            </AnimatedRoute>
            
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Grid>
                <VerElemento type = {elemType} elemento = {elem} setProyecto = {setElem} url = {url} updateElems = {updateElems} 
                isFase = {isFase} isTarea = {isTarea} isIteracion = {isIteracion} />
                </Grid>
            </AnimatedRoute>

            {isIteracion && !isTarea && <AnimatedRoute path={`${path}/:id(\\d+)/tareas-asociadas`}>
                {<BotonVolver url = {url+"/"+elem.id}/>} 
                <Layout
                    titulo = {"Tareas en Iteración"}
                    ladoIzquierdo = {<AgregarProyecto titulo = {"Crear Tarea"} url = {"/proyectos/"+isIteracion.id+"/tareas/crear"}/>} 
                    fin ={ <VistaListado elems = {elementos} 
                          updateElems = {() => updateElems("/proyectos/"+isIteracion.id+"/tareas", filterTareaInIteracion) }  
                          mapf = {mapProyecto} />
                    }
                />
            </AnimatedRoute>}
        </AnimatedSwitch>
     </ContentWrapper>
  )
};
