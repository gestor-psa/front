import React, {useState} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";


export default ({label, onChange, defaultValue = null, ...props}) => {
    const [valor, setValor] = useState(defaultValue);
    const onEveryChange = nuevoValor => {
        setValor(nuevoValor);
        onChange(nuevoValor);
    }

    return (
        <KeyboardDatePicker
            {...props}
            autoOk
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            label={label}
            value={valor}
            onChange={onEveryChange}
        />
    )
}
