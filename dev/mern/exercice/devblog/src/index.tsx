// ----- imports -------
// node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

// intern components
import { AppRouter } from './router/router'

// store
import Store, { StoreProvider }  from './store/Store'

// style
import './css/index.css';

// ------- app rendering ------
// @ts-ignore
export const store = new Store()

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
