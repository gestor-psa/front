import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2, 0)
    }
}));

export default ({children}) => {
    const classes = useStyles();

    return (
        <Container fixed>
            <div className={classes.wrapper}>
                {children}
            </div>
        </Container>
    )
}
