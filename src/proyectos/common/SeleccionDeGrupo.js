import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default ({opciones, seleccionPorDefecto, onChange = () => null, titulo, errors, register}) => {
    const [seleccionado, setSeleccionado] = useState(seleccionPorDefecto || opciones[0].valor);
    const classes = useStyles();
   
    return (
        <FormControl className = {classes.formControl}>
        <InputLabel > {titulo || "Estado*"}</InputLabel>
        <Select color="secondary" size={"small"} value = {seleccionPorDefecto || null}
           required
           error={errors && Boolean(errors.nombre)}
           inputRef={register && register({required: true})}
           helperText={errors && errors.nombre && 'Requerido'}
        >
            {opciones.map(({etiqueta, valor}) => (
                    <MenuItem
                        value={valor}
                        error={Boolean(errors.nombre)}
                        variant={seleccionado === valor ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSeleccionado(valor)
                            onChange({valor})
                        }}
                    >
                        {etiqueta}
                    </MenuItem>
                )
            )}
        </Select>
        </FormControl>
    )
}
