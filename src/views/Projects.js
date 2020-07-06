import React, {Fragment} from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import { makeStyles } from '@material-ui/core/styles';
import {useHistory, useRouteMatch} from "react-router";
import ProjectListButton from "proyectos/common/projectListButton";
import AnimatedSwitch from "components/common/AnimatedSwitch";
import AnimatedRoute from "components/common/AnimatedRoute";
import Paper from "@material-ui/core/Paper";
import ProjectView from "proyectos/common/projectView"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(2),
    }
}
}));

export default () => {
    const classes = useStyles();
    const { path } = useRouteMatch() || {};
    const history = useHistory();
    var projectViewProps = {}; 

    const viewProject = (projectProps)=> {
      projectViewProps = projectProps;
      history.push(`${path}/detalles`);
    }

    return (
        <Fragment>
            <ContentWrapper>
            <AnimatedSwitch>
                <AnimatedRoute exact path={path}>
                    <Paper className={classes.paper}>
                        Proyectos
                          <div className={classes.root}>
                          <ProjectListButton nombre = "Nombre Proyecto" number = {1} onClick = {viewProject}> </ProjectListButton>
                          <ProjectListButton nombre = "Nombre Proyecto 2" number = {2} onClick = {viewProject}> </ProjectListButton>
                          </div>
                        <br/>
                    </Paper>
                </AnimatedRoute>
                <AnimatedRoute path={`${path}/detalles`}>
                  <ProjectView projectInfo = {projectViewProps}></ProjectView>
                </AnimatedRoute>
            </AnimatedSwitch>
            </ContentWrapper>
        </Fragment>
    )
};
