import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import dva from './utils/dva';
import models from './models/index';

const app = dva({
  initialState: {},
  models: [...models],
  onError(e) {
    console.log('DVA ERROR', e);
  },
});

// eslint-disable-next-line no-underscore-dangle
export const Store = app._store;

const AppContainer = app.start(<App />);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
)
