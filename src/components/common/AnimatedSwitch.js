import React, {useState} from "react";
import NotFound from "views/NotFound";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative"
    }
}));

export default ({children}) => {
    const [match, setMatch] = useState(false);
    const onMatch = () => setMatch(true);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {React.Children
                .toArray(children)
                .map(child => React.cloneElement(child, {onMatch: onMatch}))}
            {!match && <NotFound/>}
        </div>
    )
}
