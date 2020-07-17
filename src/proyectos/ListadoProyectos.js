import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Proyecto from './Proyecto'



export default () => {
    const [proyectos, setProyectos] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos')
            .then(res => {
                console.log(res);
                setProyectos(res.data);
            })
            .catch(error => {
                // TODO.
            })
    }, []);

    return (
        <Fragment>
            {proyectos && proyectos.map(proyecto => (
                <Proyecto proyecto={proyecto} key={proyecto.id}/>
            ))}
        </Fragment>
    )
}