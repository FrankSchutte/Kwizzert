import update from 'immutability-helper';

import {RECEIVE_QUESTION} from '../constants';

const initialState = {};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_QUESTION:
            return update(state, {
                question: {$set: action.question}
            });
        default:
            return state
    }
};

export default questionReducer;
