import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reduxThunk from 'redux-thunk';
import {Provider} from "react-redux"
import { createStore,compose,applyMiddleware } from 'redux';
import reducer  from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  
    <Provider store={store}>
    <App />
    </Provider> 
  ,
  document.getElementById('root')
);


