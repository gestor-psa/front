import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

export default ({mapf, url}) => {
    const [elems, setElems] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + url)
            .then(res => {
                console.log(res);
                setElems(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, []);

    return (
        <Fragment>
            {elems && elems.map(mapf)}
        </Fragment>
    )
}