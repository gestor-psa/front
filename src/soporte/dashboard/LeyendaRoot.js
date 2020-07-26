import Grid from "@material-ui/core/Grid";
import React, {Children} from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1.5)
    }
}));

export default ({children}) => {
    const classes = useStyles()

    return (
        <Grid container justify="center" className={classes.root}>
            {Children.toArray(children).map((child, key) =>
                <Grid item key={key}>{child}</Grid>
            )}
        </Grid>
    )
}
