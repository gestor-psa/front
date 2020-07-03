import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export default (props) =>{
        const classes = useStyles();

        return (
            <Button className={classes.paper} variant='outlined'>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="imagen o grafico" src="/static/images/grid/imagen.jpg" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" align="left">
                        {props.nombre}
                        </Typography>
                        <Typography variant="body2" gutterBottom align="left">
                        Encargado
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="left">
                        Estado
                        </Typography>
                    </Grid>
                    <Grid item>
                    <LinearProgress variant="determinate" value={33*props.number}></LinearProgress>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" >
                        {"#"+props.number}
                    </Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Button>
        )
}
