import React, {Fragment} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Color from 'color';
import 'typeface-roboto';


export default ({children}) => {
    /**
     * Customize theme.
     */
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#47CC31',
                lighter: ratio => Color('#47CC31').lighten(ratio / 100).hex()
            },
            secondary: {
                main: '#B531CC',
                lighter: ratio => Color('#B531CC').lighten(ratio / 100).hex()
            },
        },
    });

    /**
     * Set components.
     */
    return (
        <Fragment>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </Fragment>
    )
}
