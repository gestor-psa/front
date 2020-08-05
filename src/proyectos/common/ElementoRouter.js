import React, {  } from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";

import VistaListado from 'proyectos/VistaListado';
import Proyecto from 'proyectos/Proyecto'
import AgregarProyecto from 'proyectos/AgregarProyecto';
import CrearProyecto from 'proyectos/PantallaEdicionElemento';
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

  const [elementos, setElems] = React.useState({});

  const mapProyecto = (proyecto) => (
    <Proyecto proyecto={proyecto} key={proyecto.id || proyecto.codigo} showEncargado = {isTarea || isProyecto}/>
  )

  const updateElems = () => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url)
            .then(res => {
                console.log(res);
                /*res.data.sort((a, b) =>{ 
                    var aid = a.id || a.codigo
                    var bid = b.id || b.codigo
                    return (aid > bid && a) || b })*/
                setElems(res.data);
            })
            .catch(error => {
                // TODO.
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

        </AnimatedSwitch>
     </ContentWrapper>
  )
};
