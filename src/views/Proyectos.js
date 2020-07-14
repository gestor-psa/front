import React from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { useRouteMatch } from "react-router";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import VerProyectos from 'proyectos/VerProyectos'


export default () => {
  const { path } = useRouteMatch() || {};

  return (
    <ContentWrapper>
      <AnimatedSwitch>
        <AnimatedRoute exact path={path}>
          <VerProyectos />
        </AnimatedRoute>
      </AnimatedSwitch>
    </ContentWrapper>

  )
};
