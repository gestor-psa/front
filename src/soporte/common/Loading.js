import React, {Fragment} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    esqueleto: {
        position: ({mostrar}) => mostrar ? 'absolute' : 'initial',
        top: 0,
        left: 0,
        width: '100%'
    }
});

export default ({children, esqueleto, mostrar, timeout = 500, className='', clases = {esqueleto: ''}}) => {
    const classes = useStyles({mostrar});

    return (
        <div className={`${classes.root} ${className}`}>
            {mostrar && (
                <Fade in={true} timeout={timeout}>
                    <div>{children}</div>
                </Fade>
            )}
            <Fade in={!mostrar} timeout={timeout} unmountOnExit>
                <div className={`${classes.esqueleto} ${clases.esqueleto}`}>
                    {esqueleto}
                </div>
            </Fade>
        </div>
    )
}
