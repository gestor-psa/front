import React from 'react';
import {useHistory} from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        cursor: 'pointer'
    },
}));

export default ({backUrl, className}) => {
    const classes = useStyles();
    const history = useHistory();
    const volver = () => {
        if (!backUrl) {
            history.goBack();
        } else {
            history.push(backUrl);
        }

    };

    return (
        <div className={className}>
        <ArrowBackIcon
            className={classes.root}
            fontSize="large"
            onClick={volver}
        />
        </div>
    );
}
