import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchSelect from "proyectos/common/SearchSelect";
import axios from "axios";


export default ({onDataChange, elemento, proyecto}) => {
    const [faseId, setFaseId] = React.useState(elemento.faseId);
    const url = process.env.REACT_APP_URL_PROYECTOS + "/proyectos/" + (proyecto.id||proyecto.codigo);

    console.log(faseId, url+"/fases/"+faseId+"/iteraciones");

    return (
        <div>
            {<SearchSelect
                url={url+"/fases"}
                defaultValue={elemento.faseId}
                autocompleteProps={{
                    getOptionLabel:elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({faseId: v.id || v.codigo || false})
                        setFaseId(v.id || v.codigo || false);
                        if (!faseId) onDataChange({iteId: false});
                    }
                }}
                textFieldProps={{label: 'Fase Asignada'}}
            />}
            {faseId && <SearchSelect
                url={url+"/fases/"+faseId+"/iteraciones"}
                defaultValue={elemento.iteId}
                autocompleteProps={{
                    getOptionLabel: elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({iteId: v.id || v.codigo || false})
                    }
                }}
                textFieldProps={{label: 'Iteracion Asignada'}}
            />}
        </div>
    )
}
