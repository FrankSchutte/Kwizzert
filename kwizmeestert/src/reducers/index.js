import {combineReducers} from 'redux';

import answerReducer from './answerReducer';
import categoryReducer from './categoryReducer';
import routingReducer from './routingReducer';
import teamReducer from './teamReducer';
import questionReducer from './questionReducer';

const reducers = combineReducers({
    answerReducer, categoryReducer, routingReducer, teamReducer, questionReducer
});

export default reducers;
