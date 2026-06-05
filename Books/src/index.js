import './index.css';
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from './context/books';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render( <Provider><App/></Provider> ); // App shows up as a prop to our provider called children