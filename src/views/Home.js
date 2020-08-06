import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import ContentWrapper from "components/common/ContentWrapper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(7),
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
                <Typography variant="h6">Home</Typography>
                <Typography variant="h4">Gestor - PSA</Typography>
            </Paper>
        </ContentWrapper>
    );
};
