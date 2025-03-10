import "./index.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-multi-carousel/lib/styles.css";

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import packageJson from "../package.json";

window.document.body.insertAdjacentHTML(
  "afterbegin",
  '<div id="apollos-project-widget"></div>'
);

window.apollosEmbedsVersion = packageJson.version;

const root = ReactDOM.createRoot(
  document.getElementById("apollos-project-widget")
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
