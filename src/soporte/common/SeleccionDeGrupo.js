import React, {useState} from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {useMediaQuery} from "@material-ui/core";

export default ({opciones, seleccionPorDefecto, onChange = () => null}) => {
    const [seleccionado, setSeleccionado] = useState(seleccionPorDefecto || opciones[0].valor);
    const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

    return (
        <ButtonGroup color="secondary" size={isXs ? "small" : "medium"}>
            {opciones.map(({etiqueta, valor}) => (
                    <Button
                        key={valor}
                        variant={seleccionado === valor ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSeleccionado(valor)
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
