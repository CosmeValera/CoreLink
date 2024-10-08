import React from 'react';

import { PrimeReactProvider } from 'primereact/api';

import '..//style/themes/gmv-theme/theme.scss';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import "./index.scss";
import "./hide-overlay.scss";

import { isSatelliteNull, isSatelliteAvailable } from './helpers/validSatellite';
import MifProvider from './provider/MifProvider';
import DomainPage from './pages/DomainPage';
import ErrorPage from './pages/ErrorPage';

const Main = (props: {satellite: string}) => {
  const pageToRender = (() => {
    if (isSatelliteNull(props.satellite)) {
      return <ErrorPage text="No Submarine!" />;
    }

    if (!isSatelliteAvailable(props.satellite)) {
      return <ErrorPage text="Submarine not available :_("/>
    }
    
    return <DomainPage satellite={props.satellite}/>
  })

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <MifProvider domain={props.satellite}>
        {pageToRender()}
      </MifProvider>
    </PrimeReactProvider>
  );
};


export default Main;