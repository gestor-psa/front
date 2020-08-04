import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchSelect from "proyectos/common/SearchSelect";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    campo: {
        width: '100%',
        marginBottom: theme.spacing(2.5)
    }
}));

export default ({onDataChange, register, errors, mostrarEncargado, proyecto = {}}) => {
    const classes = useStyles();
    const url = process.env.REACT_APP_URL_RECURSOS + '/employees';
    const [resp, setResp] = React.useState({});

    const getResp = () => {
        if (mostrarEncargado && proyecto.responsableDni) {
            axios.get(url)
                .then(res => {
                    var filterdni = res.data.filter(x => x.dni === proyecto.responsableDni);
                    filterdni.length > 0 && setResp(filterdni[0]);
                })
            return resp;
        }
        return {name: "Sin", surname: "Asignar"};
    };
    const responsable = getResp();

    return (
        <div>
            <TextField
                label='Nombre'
                className={classes.campo}
                key={proyecto.nombre}
                defaultValue={proyecto.nombre}
                onChange={(e) => onDataChange({nombre: e.target.value})}
                // Validacion.
                required
                name='nombre'
                error={Boolean(errors.nombre)}
                inputRef={register({required: true})}
                helperText={errors.nombre && 'El nombre es requerido'}
            />
            <TextField
                rows={8}
                rowsMax={16}
                multiline
                label='Descripción'
                className={classes.campo}
                key={proyecto.descripcion}
                defaultValue={proyecto.descripcion}
                onChange={(e) => onDataChange({descripcion: e.target.value})}
                // Validacion.
                required
                name='descripcion'
                error={Boolean(errors.descripcion)}
                inputRef={register({required: true})}
                helperText={errors.descripcion && 'La descripcion es requerida'}
            />
            {mostrarEncargado && <SearchSelect
                url={url}
                defaultValue={responsable}
                autocompleteProps={{
                    getOptionLabel: empleado => (empleado.name+' ' + empleado.surname),
                    onChange: (e, v) => onDataChange({responsableDni: v.dni})
                }}
                textFieldProps={{label: 'Responsable'}}
            />}
        </div>
    )
}
