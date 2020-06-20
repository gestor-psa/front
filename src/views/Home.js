import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import ContentWrapper from "components/common/ContentWrapper";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2),
        }
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <ContentWrapper>
            <Paper className={classes.paper}>
                Home
            </Paper>
        </ContentWrapper>
    );
};