import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { Environment } from '@linux2k20/relay';

import './index.css';
import App from './App';
const rootEl = document.getElementById('root');

if (rootEl) {
  ReactDOM.render(
    <RelayEnvironmentProvider environment={Environment}>
      <Suspense fallback={'loading....'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>,
    rootEl,
  );
} else {
  throw new Error('wrong rootEl');
}
