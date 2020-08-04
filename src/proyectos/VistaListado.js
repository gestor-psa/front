import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

export default ({mapf, url}) => {
    const [elems, setElems] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url)
            .then(res => {
                console.log(res);
                res.data.sort((a, b) =>{ 
                    var aid = a.id || a.codigo
                    var bid = b.id || b.codigo
                    return (aid < bid && a) || b })
                setElems(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, [url]);
   
    return (
        <Fragment>
            {(elems && elems.length > 0 && elems.map(mapf)) ||
                <Typography variant="body">
                    Esta lista esta vacía
                </Typography>
            }
        </Fragment>
    )
}