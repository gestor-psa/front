import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
    },
  }));

export default (props) =>{
    const classes = useStyles();

    return(<Paper className={classes.paper} variant='outlined'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="body2" gutterBottom align="left">
                        info a
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="left">
                        info b
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    )
}

