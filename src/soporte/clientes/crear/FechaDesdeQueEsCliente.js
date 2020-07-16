import React, {useEffect} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Controller} from "react-hook-form";


export default ({label, onDataChange, control, defaultValue = null, ...props}) => {

    return (
        <Controller
            name='fechaDesdeQueEsCliente'
            render={({onChange, value = defaultValue}) => {
                useEffect(() => {
                    onChange(defaultValue)
                }, [onChange])

                const onFechaChange = v => {
                    onChange(v)
                    onDataChange(v.format('YYYY-MM-DD'))
                }

                return (
                    <KeyboardDatePicker
                        {...props}
                        onChange={onFechaChange}
                        autoOk
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        label={label}
                        value={value}
                    />
                )
            }}
            control={control}
            rules={{required: true, validate: v => !v.isValid || v.isValid()}}
        />
    )
}
