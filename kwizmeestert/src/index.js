import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import quiz from './reducers/quizReducer';
import './index.css';

let store;
const middleware = applyMiddleware(
    thunk
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const reduxDevtoolConnector = window.__REDUX_DEVTOOLS_EXTENSION__();
    store = createStore(
        quiz,
        compose(middleware, reduxDevtoolConnector)
    );
} else {
    console.log('Redux dev tool is er niet pleb!');
    store = createStore(
        null,
        middleware
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
