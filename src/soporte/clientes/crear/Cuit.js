import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Controller} from "react-hook-form";


const useStyles = makeStyles(theme => ({
    cuit: {
        '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    }
}));

export default ({onDataChange, control, errors, defaultValue = '', className = ''}) => {
    const classes = useStyles();

    const cuitErrors = {
        'required': 'El CUIT es requerido',
        'pattern': 'El CUIT se compone de 11 números',
        'validate': 'El CUIT no es valido'
    }

    /**
     * https://gist.github.com/neiker/874c197cd0cbb06efb328f3cbc6753b3
     * @param cuil
     * @returns {boolean}
     */
    const validarCuit = cuil => {
        if (cuil.length !== 11) {
            return false;
        }

        const [checkDigit, ...rest] = cuil
            .split('')
            .map(Number)
            .reverse();

        const total = rest.reduce(
            (acc, cur, index) => acc + cur * (2 + (index % 6)),
            0,
        );

        const mod11 = 11 - (total % 11);

        if (mod11 === 11) {
            return checkDigit === 0;
        }

        if (mod11 === 10) {
            return false;
        }

        return checkDigit === mod11;
    }

    return (
        <Controller
            name='cuit'
            rules={{
                required: true,
                pattern: /^[0-9]{11}$/,
                validate: validarCuit
            }}
            control={control}
            render={({onChange, value = defaultValue}) => {

                const onCuitChange = e => {
                    const cuit = e.target.value.slice(0, 11)
                    onDataChange({cuit})
                    onChange(cuit)
                }

                useEffect(() => {
                    onChange(defaultValue)
                }, [onChange])

                return (
                    <TextField
                        onChange={onCuitChange}
                        value={value}
                        label='CUIT'
                        className={`${classes.cuit} ${className}`}
                        required
                        type="number"
                        error={Boolean(errors.cuit)}
                        helperText={errors.cuit && cuitErrors[errors.cuit.type]}
                    />)
            }}
        />
    )
}
