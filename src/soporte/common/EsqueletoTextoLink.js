import Typography from "@material-ui/core/Typography";
import Loading from "soporte/common/Loading";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    grupo: {
        margin: theme.spacing(1, 0),
        display: 'flex'
    },
    descriptor: {
        fontWeight: 600
    },
    esqueleto: {
        flexGrow: 1
    },
    valor: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    }
}));

export default ({etiqueta, mostrar, valor, to = ''}) => {
    const classes = useStyles();

    return (
        <div className={classes.grupo}>
            <Typography className={classes.descriptor}>
                {etiqueta}:&nbsp;
            </Typography>
            <Loading mostrar={mostrar}
                     className={classes.esqueleto}
                     esqueleto={<Typography><Skeleton/></Typography>}
            >
                <Typography
                    className={classes.valor}
                    component={Link}
                    to={to}
                >
                    {valor}
                </Typography>
            </Loading>
        </div>
    )
}
