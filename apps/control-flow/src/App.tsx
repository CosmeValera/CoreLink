import React from 'react';
import ReactDOM from 'react-dom/client';

import Main from './Main';

async function deferRender() {
    // if (process.env.NODE_ENV !== 'development') {
    //   return
    // }
    const { worker } = await import('./mocks/browser.js');
    return worker.start();
}

// deferRender().then(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        throw new Error('Failed to find the root element');
    }
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        // <React.StrictMode>
            <Main satellite="316"/>
        // </React.StrictMode>,
    );
// })