import {combineReducers} from 'redux';
import routingReducer from './routingReducer';
import teamsReducer from './teamsReducers';
import questionReducer from './questionReducer';

const reducers = combineReducers({
    routingReducer,
    teamsReducer,
    questionReducer
});

export default reducers;