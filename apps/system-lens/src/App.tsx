import React from "react";
import { createRoot } from 'react-dom/client';

import MainContainer from './Main';

// async function deferRender() {
//     // if (process.env.NODE_ENV !== 'development') {
//     //   return
//     // }
//     const { worker } = await import('./mocks/browser.js');
//     return worker.start();
// }
  
// deferRender().then(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        throw new Error('Failed to find the root element');
    }
    const root = createRoot(rootElement);
    root.render(
        // <React.StrictMode>
            <MainContainer satellites={["316"]}/>
        // </React.StrictMode>,
    );
// })