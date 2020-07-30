import React from 'react';
import { useRouteMatch } from 'react-router';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default ({titulo = "Nuevo proyecto", url}) => {
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