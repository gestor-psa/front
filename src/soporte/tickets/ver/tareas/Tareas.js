import Typography from "@material-ui/core/Typography";
import React from "react";
import Tarea from "soporte/tickets/ver/tareas/Tarea";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Loading from "soporte/common/Loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {withWidth} from "@material-ui/core";
import {useHistory} from "react-router";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4)
    },
    titulo: {
        marginBottom: theme.spacing(2)
    }
}));


export default withWidth()(({tareas, mostrar, width}) => {
    const classes = useStyles();

    const sizes = {xs: 12, sm: 6, md: 4, lg: 3}
    const skeletonQuantity = {xs: 1, sm: 2, md: 3, lg: 4}
    const history = useHistory()

    const onTareaClick = (proyectoId, tareaId) => {
        history.push(`/proyectos/${proyectoId}/tareas/${tareaId}`)
    }

    return (
        <div className={classes.root}>
            <Typography variant='h5' className={classes.titulo}>Tareas asociadas</Typography>
            <Loading mostrar={mostrar} esqueleto={
                <Grid container spacing={3}>
                    {Array(skeletonQuantity[width]).fill(null).map((n, key) =>
                        <Grid item key={key} {...sizes}>
                            <Skeleton variant="rect" height={95}/>
                        </Grid>
                    )}
                </Grid>
            }>
                <Grid container spacing={3}>
                    {mostrar && (tareas.length > 0 ? tareas.map((tarea, key) =>
                                <Grid key={key} item {...sizes}>
                                    <Tarea
                                        tarea={tarea}
                                        onClick={() => onTareaClick(tarea.proyectoId, tarea.id)}
                                    />
                                </Grid>
                            ) :
                            <Grid item xs={10}>
                                <Typography>Aun no hay tareas asociadas.</Typography>
                            </Grid>
                    )}
                </Grid>
            </Loading>
        </div>
    )
})
