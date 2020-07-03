import React, {Fragment} from 'react';
import ContentWrapper from "components/common/ContentWrapper";
import MetaInfo from "components/common/MetaInfo";
import { makeStyles } from '@material-ui/core/styles';
import ProjectListButton from "components/projects/projectListButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default () => {
    const classes = useStyles();
    
    return (
        <Fragment>
            <MetaInfo
                title={'PSA - Proyectos'}
                description='Modulo de proyectos'
            />
            <ContentWrapper>
                Proyectos
                <div className={classes.root}>
                <ProjectListButton nombre = "Nombre Proyecto" number = {1}> </ProjectListButton>
                <ProjectListButton nombre = "Nombre Proyecto 2" number = {2}> </ProjectListButton>
                </div>
            </ContentWrapper>
        </Fragment>
    )
};
