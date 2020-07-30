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
import Grid from '@material-ui/core/Grid';
import BotonVolver from 'proyectos/common/BotonVolver'

export default ({url, titulo, elem, setElem, isFase, isTarea, isIteracion, urlReturn}) => {
  const { path } = useRouteMatch() || {};
  const history = useHistory();

  const mapProyecto = (proyecto) => (
    <Proyecto proyecto={proyecto} key={proyecto.id || proyecto.codigo}/>
  )

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

  return (
    <ContentWrapper>
      <AnimatedSwitch>
        
            <AnimatedRoute exact path={path}>
                <Fragment>
                    {(urlReturn && <BotonVolver url = {urlReturn}/>)}
                    <AgregarProyecto titulo = {titulo} url = {url}/>
                    <VistaListado mapf = {mapProyecto} url = {url} />
                </Fragment>
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/crear`}>
                <CrearProyecto titulo = {titulo} onConfirm = {onConfirm} />
            </AnimatedRoute>
            <AnimatedRoute path={`${path}/:id(\\d+)`}>
                <Grid>
                <VerProyecto proyecto = {elem} setProyecto = {setElem} url = {url} />
                </Grid>
            </AnimatedRoute>

        </AnimatedSwitch>
     </ContentWrapper>
  )
};
