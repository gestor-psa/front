import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light
    },
    tituloTarea: {
        color: 'white'
    },
    descriptor: {
        display: 'inline',
        color: 'white',
        fontWeight: 600
    },
    valor: {
        display: 'inline',
        color: 'white',
        fontWeight: 500
    }
}));

export default ({tarea, onClick}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} raised={false}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" className={classes.tituloTarea}>
                                {tarea.nombre}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.descriptor}>
                                Estado:&nbsp;
                            </Typography>
                            <Typography className={classes.valor}>
                                {tarea.estado}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
