import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: ({color}) => ({
        color: theme.palette[color].main,
        borderColor: theme.palette[color].main,
    })
}));

export default ({color='primary', className='', ...props}) => {
    const classes = useStyles({color});

    return (
        <Button variant='outlined' {...props} className={`${classes.root} ${className}`}/>
    )
}
