import React, {useEffect} from "react";
import {Route} from "react-router";
import {CSSTransition} from "react-transition-group";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
    wrapper: ({duration}) => ({
        display: 'block',
        '&.page-enter': {
            opacity: 0,
            transform: 'scale(1.1)'
        },
        '&.page-enter-active': {
            opacity: 1,
            transform: 'scale(1)',
            transition: `opacity ${duration}ms, transform ${duration}ms`
        },
        '&.page-exit': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',

            opacity: 1,
            transform: 'scale(1)'
        },
        '&.page-exit-active': {
            opacity: 0,
            transform: 'scale(0.9)',
            transition: `opacity ${duration}ms, transform ${duration}ms`
        }
    })
}));

const Content = ({match, onMatch, children}) => {
    const duration = 600;
    const classes = useStyles({duration});
    useEffect(() => {
        match && onMatch();
    }, [match, onMatch])

    return (
        <CSSTransition
            in={match != null}
            timeout={duration}
            classNames="page"
            unmountOnExit
        >
            <div className={classes.wrapper}>
                {children}
            </div>
        </CSSTransition>
    )
}

export default ({children, onMatch, ...props}) => {

    return (
        <Route {...props}>
            {({match}) =>
                <Content match={match} onMatch={onMatch}>
                    {children}
                </Content>}
        </Route>
    )
}
