import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
    button: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
    },
  }));

export default (props) =>{
        const classes = useStyles();

        return (
            <Button className={classes.button} variant='outlined' onClick={()=> props.onClick(props)} >
                <Grid container spacing={2}>
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
