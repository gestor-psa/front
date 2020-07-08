import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Color from 'color';


const useStyles = makeStyles(theme => ({
    root: ({color, variant}) => {
        if (variant === 'outlined')
            return {
                color: theme.palette[color].main,
                borderColor: theme.palette[color].main,
                '&:hover': {
                    backgroundColor: Color(theme.palette[color].main).lighten(color === 'warning' ? 0.90 : 0.67).hex()
                }
            }

        if (variant === 'contained') {
            const lighter = Color(theme.palette[color].main).lighten(70 / 100).hex()

            return {
                backgroundColor: theme.palette[color].main,
                color: theme.palette[color].contrastText,
                boxShadow: `0px 3px 1px -2px ${lighter}, 0px 2px 2px 0px ${lighter}, 0px 1px 5px 0px ${lighter}`,
                '&:hover': {
                    backgroundColor: theme.palette[color].dark
                }
            }
        }

        if (variant === 'text')
            return {
                color: theme.palette[color].main
            }
    },
}));

export default ({color = 'primary', className = '', variant = 'text', ...props}) => {
    const classes = useStyles({color, variant});

    return (
        <Button variant={variant} {...props} className={`${classes.root} ${className}`}/>
    )
}
