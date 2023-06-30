import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-multi-carousel/lib/styles.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
