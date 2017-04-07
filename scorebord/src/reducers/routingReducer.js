import update from 'immutability-helper';
import {REGISTER, RECEIVE_REGISTER, SHOW_CODE, QUIZ, RESULTS, START_QUIZ, FINISH_QUIZ} from '../constants';

const initialState = {
    currentPage: REGISTER,
    code: null
};

const routingReducer = (state = initialState, action) => {
    switch(action.type) {

        case RECEIVE_REGISTER:
            if (action.success) {
                return update(state, {
                    currentPage: {$set: SHOW_CODE},
                    code: {$set: action.code}
                });
            }
            break;

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