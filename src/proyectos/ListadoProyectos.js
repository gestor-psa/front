import React, { useEffect, useState, Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Proyecto from './Proyecto'


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(5),
//         [theme.breakpoints.only('xs')]: {
//             padding: theme.spacing(2),
//         }
//     }
// }));


export default () => {
    const [proyectos, setProyectos] = useState();
    //const classes = useStyles({proyectos});

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