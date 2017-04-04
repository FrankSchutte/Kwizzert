import update from 'immutability-helper';
import {SHOW_CODE, QUIZ, RESULTS, START_QUIZ, FINISH_QUIZ} from '../constants';

const initialState = {
    currentPage: SHOW_CODE
};

const routingReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_QUIZ:
            return update(state, {
                currentPage: {$set: QUIZ}
            });
        case FINISH_QUIZ:
            return update(state, {
                currentPage: {$set: RESULTS}
            });
        default:
            return state;
    }
};

export default routingReducer;