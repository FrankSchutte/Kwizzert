import {combineReducers} from 'redux';

import questionReducer from './questionReducer';
import routingReducer from './routingReducer';

const reducers = combineReducers({
    questionReducer, routingReducer
});

export default reducers;
