import update from 'immutability-helper';

import {RECEIVE_CREATE_QUIZ, CREATE_QUIZ, PICK_TEAMS, START_QUIZ, PICK_CATEGORIES, START_ROUND, PICK_QUESTION, CHOOSE_QUESTION, QUESTION, CLOSE_QUESTION, CLOSE_ROUND, ROUND_FINISHED} from '../constants';

const initialState = {
    currentPage: CREATE_QUIZ
};

const routingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CREATE_QUIZ:
            if(action.success) {
                return update(state, {
                    currentPage: {$set: PICK_TEAMS},
                    code: {$set: action.code}
                });
            }
            return state;
        case START_QUIZ:
            return update(state, {
                currentPage: {$set: PICK_CATEGORIES}
            });
        case START_ROUND:
            return update(state, {
                currentPage: {$set: PICK_QUESTION}
            });
        case CHOOSE_QUESTION:
            return update(state, {
                currentPage: {$set: QUESTION}
            });
        case CLOSE_QUESTION:
            return update(state, {
                currentPage: {$set: PICK_QUESTION}
            });
        case CLOSE_ROUND:
            return update(state, {
                currentPage: {$set: ROUND_FINISHED}
            });
        default:
            return state;
    }
};

export default routingReducer;
