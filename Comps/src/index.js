import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { NavigationProvider } from "./context/navigation.JS";


ReactDOM.createRoot(document.getElementById("root")).render(
  <NavigationProvider> <App/></NavigationProvider>
);
