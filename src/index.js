import React from 'react';
import { render } from "react-dom";
import App from 'app';

if (process.env.NODE_ENV === 'development') {
    console.log('Starting mock service worker...')
    const { worker } = require('mocks/browser')
    worker.start()
}

render(<App />, document.getElementById("root"));
