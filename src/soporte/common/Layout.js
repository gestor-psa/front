import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import Volver from "soporte/common/Volver";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 6),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 2)
        }
    },
    tituloWrapper: {
        display: 'flex'
    },
    volver: {
        marginRight: theme.spacing(2)
    }
}));

export default ({titulo, ladoIzquierdo, ladoDerecho, fin, backUrl}) => {
    const classes = useStyles();
    const isMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    return (
        <Paper className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.tituloWrapper}>
                    {backUrl && <Volver backUrl={backUrl} className={classes.volver}/>}
                    <Typography variant='h4'>{titulo}</Typography>
                </Grid>
                <Grid item container spacing={isMd ? 6 : 2} xs={12}>
                    <Grid item xs={12} md={6}>
                        {ladoIzquierdo}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {ladoDerecho}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {fin}
                </Grid>
            </Grid>
        </Paper>
    )
}
