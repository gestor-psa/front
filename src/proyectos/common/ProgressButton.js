import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ColoredButton from "soporte/common/ColoredButton";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
    accion: {
        margin: theme.spacing(0, 2)
    },
    progreso: {
        marginLeft: theme.spacing(1.5)
    }
}));

export default ({children, inProgress, className, ...props}) => {
    const classes = useStyles();

    return (
        <ColoredButton
            {...props}
            className={`${classes.accion} ${className}`}
        >
            {children}
            {inProgress && <CircularProgress
                size={20}
                color='inherit'
                className={classes.progreso}
            />}
        </ColoredButton>
    )
}
