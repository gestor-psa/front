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

export default ({opciones, seleccionPorDefecto, onChange = () => null}) => {
    const [seleccionado, setSeleccionado] = useState(seleccionPorDefecto || opciones[0].valor);
    const classes = useStyles();
    console.log(opciones, seleccionPorDefecto);
    return (
        <FormControl className = {classes.formControl}>
        <InputLabel >Estado*</InputLabel>
        <Select color="secondary" size={"small"} value = {seleccionPorDefecto || null}>
            {opciones.map(({etiqueta, valor}) => (
                    <MenuItem
                        value={valor}
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
