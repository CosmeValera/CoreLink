import React from 'react';
import ReactDOM from 'react-dom/client';

import Main from './Main';

async function deferRender() {
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
        <Main satellite="316"/>
    );
// })