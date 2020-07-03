import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    esqueleto: {
        position: ({show}) => show ? 'initial' : 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    }
});

export default ({children, esqueleto, show, timeout = 500, className='', clases = {esqueleto: ''}}) => {
    const classes = useStyles({show});

    return (
        <div className={`${classes.root} ${className}`}>
            {!show && (
                <Fade in={true} timeout={timeout}>
                    {children}
                </Fade>
            )}
            <Fade in={show} timeout={timeout} unmountOnExit>
                <div className={`${classes.esqueleto} ${clases.esqueleto}`}>
                    {esqueleto}
                </div>
            </Fade>
        </div>
    )
}
