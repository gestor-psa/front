import React from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


export default ({opciones = null, defaultValue = null, url = '', autocompleteProps = {}, textFieldProps = {}}) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(opciones);
    const loading = open && !options;

    React.useEffect(() => {
        if (!opciones && loading) {
            axios.get(url)
                .then(res => setOptions(res.data))
        }
    }, [url, loading, opciones]);

    const getOptionLabel = autocompleteProps.getOptionLabel || (x => x);

    return (
        <Autocomplete
            {...autocompleteProps}
            defaultValue={defaultValue}
            key={defaultValue ? getOptionLabel(defaultValue) : ''}
            open={open}
            openOnFocus
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options || []}
            noOptionsText='No encontrado'
            loading={loading}
            loadingText='Cargando...'
            renderInput={(params) => (
                <TextField
                    {...textFieldProps}
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="primary" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(option, {inputValue}) => {
                const matches = match(getOptionLabel(option), inputValue);
                const parts = parse(getOptionLabel(option), matches);

                return (
                    <div>
                        {parts.map((part, index) => (
                            <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                                {part.text}
                            </span>
                        ))}
                    </div>
                );
            }}
        />
    );
}
