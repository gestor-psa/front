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

export default function DatePickers({tag ,name, defvalue, onChange}) {
  const classes = useStyles();
  console.log(new Date(defvalue));
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label= {name}
        type="date"
        defaultValue= {new Date(defvalue)}
        value = {defvalue}
        className={classes.textField}
        onChange = {(e) => {onChange({[tag]: e.target.value})}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
