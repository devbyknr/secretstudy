import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'; //CSS Framework

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'; //redux 연결
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; //index.js 안붙여도 알아서 찾음

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk) (createStore) //Store 생성

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store ={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
