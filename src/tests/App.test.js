import React from 'react';
import {render} from '@testing-library/react';
import App from 'app';

/**
 * Mock window.matchMedia.
 */
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

/**
 * Mock window.scrollTo.
 */
Object.defineProperty(window, 'scrollTo', {
  value: () => null,
  writable: true
});

test('renders app', () => {
    const {getAllByText} = render(<App/>);
    const linkElement = getAllByText(/home/i)[0];
    expect(linkElement).toBeInTheDocument();
});