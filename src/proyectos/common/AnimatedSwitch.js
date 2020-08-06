import React, {} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative"
    }
}));

export default ({children}) => {
    const onMatch = () => {};
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {React.Children
                .toArray(children)
                .map(child => React.cloneElement(child, {onMatch: onMatch}))}
        </div>
    )
}
