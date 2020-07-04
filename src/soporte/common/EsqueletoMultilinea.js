import Typography from "@material-ui/core/Typography";
import Loading from "soporte/common/Loading";
import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";


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
    esqueletoDescripcion: {
        width: '100%'
    }
}));

export default ({etiqueta, mostrar, valor, filas}) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.descriptor}>
                    {etiqueta}:&nbsp;
                </Typography>
            </Grid>
            <Loading mostrar={mostrar}
                     className={classes.esqueletoDescripcion}
                     esqueleto={
                         <Fragment>
                             {Array(filas).fill(null).map((n, key) =>
                                 <Grid key={key} item xs={12}>
                                     <Typography><Skeleton/></Typography>
                                 </Grid>
                             )}
                         </Fragment>
                     }>
                <Typography className={classes.campo}>
                    {valor}
                </Typography>
            </Loading>
        </Grid>
    )
}
