import React from "react";
import logo from 'assets/img/logo.png';
import {Link} from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    link: {
        textAlign: 'center',
        textDecoration: 'none',
        outline: 0
    },
    logo: {
        width: 'auto',
        height: ({height}) => height,
        margin: ({showName}) => showName ? 0 : theme.spacing(1.5),
    }
}));

export default ({height}) => {
    const classes = useStyles({height: height});

    return (
        <Link to='/' className={classes.link}>
            <div className={classes.logoWrapper}>
                <img src={logo} className={classes.logo} alt="logo"/>
            </div>
        </Link>
    )
}