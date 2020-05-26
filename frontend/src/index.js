import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './redux/reducer';
import thunk from 'redux-thunk';
import StateLoader from './utilities/StateLoader/StateLoader';

const stateLoader = new StateLoader();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, stateLoader.loadState(), composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

