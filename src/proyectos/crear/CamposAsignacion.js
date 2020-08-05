import React from "react";
import SearchSelect from "proyectos/common/SearchSelect";
import axios from "axios";


export default ({onDataChange, elemento, proyecto}) => {
    const url = process.env.REACT_APP_URL_PROYECTOS + "/proyectos/" + (proyecto.id||proyecto.codigo);
    const [fase, setFase] = React.useState();
    const [ite, setIte] = React.useState();

    const getFase = () => {
        if (elemento.faseId) {
            axios.get(url+"/fases/"+elemento.faseId)
                .then(res => {
                    setFase(res.data);
                })
            return fase;
        }
    };
    const fase_ini = getFase();

    const getIte = () => {
        if (elemento.iteracionId && elemento.faseId) {
            axios.get(url+"/fases/"+(fase.id)+"/iteraciones/"+elemento.iteracionId)
                .then(res => {
                    setIte(res.data);
                })
            return ite;
        }
    };
    const ite_ine = getIte();


    return (
        <div>
            {<SearchSelect
                url={url+"/fases"}
                defaultValue={fase_ini}
                autocompleteProps={{
                    getOptionLabel:elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({faseId: (v && (v.id || v.codigo)) || false})
                        setFase(v);
                        if (!fase) onDataChange({iteracionId: false});
                    }
                }}
                textFieldProps={{label: 'Fase Asignada'}}
            />}
            {fase && <SearchSelect
                url={url+"/fases/"+fase.id+"/iteraciones"}
                defaultValue={ite_ine}
                autocompleteProps={{
                    getOptionLabel: elem => (elem.nombre && elem.nombre.capitalize()),
                    onChange: (e, v) => {
                        onDataChange({iteracionId: (v && (v.id || v.codigo)) || false})
                    }
                }}
                textFieldProps={{label: 'Iteracion Asignada'}}
            />}
        </div>
    )
}
