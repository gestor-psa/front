import Typography from "@material-ui/core/Typography";
import Loading from "soporte/common/Loading";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';


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
    }
}));

export default ({etiqueta, mostrar, valor}) => {
    const classes = useStyles();

    return (
        <div className={classes.grupo}>
            <Typography className={classes.descriptor}>
                {etiqueta}:&nbsp;
            </Typography>
            <Loading show={mostrar}
                     className={classes.esqueleto}
                     esqueleto={<Typography><Skeleton/></Typography>}
            >
                <Typography>
                    {valor}
                </Typography>
            </Loading>
        </div>
    )
}
