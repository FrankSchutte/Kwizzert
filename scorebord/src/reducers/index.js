import {combineReducers} from 'redux';
import routingReducer from './routingReducer';
import teamsReducer from './teamsReducers';

const reducers = combineReducers({
    routingReducer,
    teamsReducer
});

export default reducers;