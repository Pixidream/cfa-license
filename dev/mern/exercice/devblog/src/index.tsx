// ----- imports -------
// node modules
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

// intern components
import { AppRouter } from './router/router'

// store
import { StoreInstance } from './store/Store'

// style
import './css/index.css';

// ------- app rendering ------
// @ts-ignore
export const StoreContext = createContext()

ReactDOM.render(
  <StoreContext.Provider value={StoreInstance}>
    <Router>
      <AppRouter />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);
