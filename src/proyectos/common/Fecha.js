import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({tag ,name, defvalue = "YYYY-MM-DD", onChange}) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label= {name}
        type="date"
        defaultValue= {defvalue}
        className={classes.textField}
        onChange = {(e) => {onChange({[tag]: e.target.value})}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
