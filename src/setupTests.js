// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import mediaQuery from "css-mediaquery";
import {server} from 'mocks/server'


// global.console = {
//     log: jest.fn(),
//     error: console.error,
//     warn: jest.fn(), // let's ignore the warnigs :)
//     info: console.info,
//     debug: console.debug,
// };

jest.setTimeout(120000);

/**
 * Setup mock service worker.
 */
beforeAll(() => {
    server.listen()
})
afterEach(() => {
    server.resetHandlers()
})
afterAll(() => {
    server.close()
})

/**
 * Mock window.scrollTo.
 */
Object.defineProperty(window, 'scrollTo', {
    value: () => null,
    writable: true
});

/**
 * Make media breakpoints available
 */
const createMatchMedia = (width) => {
    return query => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });
}

window.matchMedia = createMatchMedia(window.innerWidth);

window.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 30,
    height: 30
});
