import {combineReducers} from 'redux';

import pageReducer from './pageReducer';
import teamReducer from './teamReducer';

const reducers = combineReducers({
    pageReducer, teamReducer
});

export default reducers;
