import React from "react";

import { PrimeReactProvider } from 'primereact/api';

import "../../../packages/style/themes/gmv-theme/theme.scss";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./index.scss";
import "./hide-overlay.scss";

import MultiRowTable from "./components/MultiRowTable";

const Main = (props: {satellites: string[]}) => {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <main>
        <MultiRowTable domains={props.satellites} />
      </main>
    </PrimeReactProvider>
  );
};

export default Main;