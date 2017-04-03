import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import AppContainer from './components/Main';
import reducers from './reducers';
import {initWebSocket} from './kwizzertWebSocket';
import './index.css';

let store;
const middleware = applyMiddleware(
    thunk
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const reduxDevtoolConnector = window.__REDUX_DEVTOOLS_EXTENSION__();
    store = createStore(
        reducers,
        compose(middleware, reduxDevtoolConnector)
    );
} else {
    console.log('Redux dev tool is er niet pleb!');
    store = createStore(
        reducers,
        middleware
    );
}

initWebSocket(store);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
