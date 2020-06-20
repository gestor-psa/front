import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'block',
        '&.page-enter': {
            opacity: 0,
            transform: 'scale(1.1)'
        },
        '&.page-enter-active': {
            opacity: 1,
            transform: 'scale(1)',
            transition: 'opacity 600ms, transform 600ms'
        },
        '&.page-exit': {
            position: 'absolute',
            left: 0,
            top: 84,
            width: '100%',

            opacity: 1,
            transform: 'scale(1)'
        },
        '&.page-exit-active': {
            opacity: 0,
            transform: 'scale(0.9)',
            transition: 'opacity 600ms, transform 600ms'
        }
    }
}));

export default ({location, children}) => {
    const classes = useStyles();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="page"
                timeout={600}
            >
                <div className={classes.wrapper}>
                    {children}
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}
