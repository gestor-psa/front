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

export default function DatePickers({tag ,name, defvalue, onChange, errors, register}) {
  const classes = useStyles();
  
  const [val, setValue] = React.useState();

  return (
    <form className={classes.container} noValidate>
      <TextField
        required = {errors}
        error={errors && Boolean(errors.nombre)}
        inputRef={register && register({required: true})}
        helperText={errors && errors.nombre && 'Requerido'}
        id="date"
        label= {name}
        type="date"
        defaultValue= {new Date(defvalue)}
        value = {val || defvalue}
        className={classes.textField}
        onChange = {(e) => {
            if (onChange({[tag]: e.target.value})){
              setValue(e.target.value)
            }
          }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
