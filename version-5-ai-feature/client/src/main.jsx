// Import React and ReactDOM to build and render the app in the browser.
import React from "react";
import ReactDOM from "react-dom/client";

// BrowserRouter enables routing (navigation between pages).
import { BrowserRouter } from "react-router-dom";

// Main App component that contains all pages and layout.
import App from "./App";

// Connecting to global and app styling files.
import "./index.css";
import "./App.css";


// Create the root element and render the app inside it.
// Wrapping App in BrowserRouter allows routing to work across the app.
//The root element is the main HTML element where your entire React app gets inserted.
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);