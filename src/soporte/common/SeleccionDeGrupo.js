import React, {useState} from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {useMediaQuery} from "@material-ui/core";

export default ({opciones = [], seleccionPorDefecto = 0, onChange = () => null}) => {
    const [seleccionado, setSeleccionado] = useState(seleccionPorDefecto);
    const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

    return (
        <ButtonGroup color="secondary" size={isXs ? "small" : "medium"}>
            {opciones.map(({etiqueta, valor}, key) => (
                    <Button
                        key={key}
                        variant={seleccionado === key ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSeleccionado(key)
                            onChange({valor})
                        }}
                    >
                        {etiqueta}
                    </Button>
                )
            )}
        </ButtonGroup>
    )
}
