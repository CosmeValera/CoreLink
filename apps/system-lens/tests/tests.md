# Tests
We are using MSW and Vitest.

### MSW
In the folder `src/mocks` we have two files: `handlers.js`, `browser.js` and `server.js`. 
- `handlers.js`: Contains the mocked requests.
- `browser.js`: To make use of the mocked request like if it was a browser.
- `server.js`: To make use of the mocked request like if it was a server.

### Vitest
The tests in the folder `tests` are executed taking as dependency `server.js`.
To execute them:
```bash
npm run test
```