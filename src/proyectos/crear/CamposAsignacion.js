import React from "react";
import SearchSelect from "proyectos/common/SearchSelect";


export default ({onDataChange, proyecto, initv}) => {
    const url = process.env.REACT_APP_URL_PROYECTOS + "/proyectos/" + (proyecto.id||proyecto.codigo);
    const [fase, setFase] = React.useState(initv && initv.fase);
    const [ite, setIte] = React.useState(initv && initv.iteracion);

    return (
        <div>
            {<SearchSelect
                url={url+"/fases"}
                defaultValue={fase}
                autocompleteProps={{
                    getOptionLabel:elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({faseId: (v && (v.id || v.codigo)) || false, iteracionId: false})
                        setFase(v);
                        setIte(false);
                    }
                }}
                textFieldProps={{label: 'Fase Asignada'}}
            />}
            {fase && <SearchSelect
                url={url+"/fases/"+fase.id+"/iteraciones"}
                defaultValue={ite}
                autocompleteProps={{
                    getOptionLabel: elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({iteracionId: (v && (v.id || v.codigo)) || false});
                        setIte(v);
                    }
                }}
                textFieldProps={{label: 'Iteracion Asignada'}}
            />}
        </div>
    )
}
