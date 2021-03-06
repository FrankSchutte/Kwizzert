import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import Main from './components/Main';
import reducers from './reducers';
import kwizzertWebSocket from './kwizzertWebSocket';
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
    )
} else {
    console.log('Redux dev tool is er niet pleb!');
    store = createStore(
        reducers,
        middleware
    );
}

kwizzertWebSocket.init(store);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
