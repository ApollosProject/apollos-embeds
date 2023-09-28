import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-multi-carousel/lib/styles.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

window.document.body.insertAdjacentHTML(
  'afterbegin',
  '<div id="apollos-project-widget"></div>'
);

const root = ReactDOM.createRoot(
  document.getElementById('apollos-project-widget')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
