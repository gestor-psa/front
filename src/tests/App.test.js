import React from 'react';
import {render} from '@testing-library/react';
import App from 'app';


test('renders app', () => {
    const {getAllByText} = render(<App/>);
    const linkElement = getAllByText(/home/i)[0];
    expect(linkElement).toBeInTheDocument();
});
