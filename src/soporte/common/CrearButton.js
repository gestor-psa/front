import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    acciones: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3)
    }
}));

export default ({url, texto}) => {
    const classes = useStyles();

    return (
        <div className={classes.acciones}>
            <Button
                color='secondary'
                variant='contained'
                to={url}
                component={Link}
            >
                {texto}
            </Button>
        </div>
    )
}
