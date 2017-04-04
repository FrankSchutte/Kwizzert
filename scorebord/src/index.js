import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import MainContainer from './containers/MainContainer';
import './index.css';

let store;
const middleware = applyMiddleware(
    thunk
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const reduxDevToolConnector = window.__REDUX_DEVTOOLS_EXTENSION__();
    store = createStore(
        reducers,
        compose(middleware, reduxDevToolConnector)
    );
} else {
    console.log('Redux dev tool is er niet pleb!');
    store = createStore(
        reducers,
        middleware
    );
}

ReactDOM.render(
    <Provider store={store}>
        <MainContainer/>
    </Provider>,
    document.getElementById('root')
);