import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles((theme) => ({
    cta: {
        marginTop: theme.spacing(3),
    }
}));


export default ({titulo = "Nuevo proyecto", url}) => {
    const classes = useStyles();
    const {path} = useRouteMatch() || {};

    return (
        <Button
        color='secondary'
        variant='contained'
        to={`${ url || path}/crear`}
        component={Link}
        >
             {titulo}
        </Button>
    )
}