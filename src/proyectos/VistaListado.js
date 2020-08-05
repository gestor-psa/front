import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

export default ({mapf, elems, updateElems}) => {

    useEffect(() => {
       updateElems();
    }, [updateElems]);
   
    return (
        <Fragment>
            {(elems && elems.length > 0 && elems.map(mapf)) ||
                <Typography variant="body1">
                    Esta lista esta vacía
                </Typography>
            }
        </Fragment>
    )
}