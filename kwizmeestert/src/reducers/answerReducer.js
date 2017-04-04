import update from 'immutability-helper';

import {CONFIRM_ANSWER, TOGGLE_ANSWER, CLOSE_QUESTION} from '../constants';

const initialState = {
    answers: []
};

const answerReducer = (state = initialState, action) => {
    let index;
    switch (action.type) {
        case CONFIRM_ANSWER:
            //TODO fix this, cannot be used with multiple submissions
            index = -1;
            state.answers.forEach(function (answer, i) {
                if (action.teamName === state.teamName) {
                    index = i;
                }
            });

            // if teamName already exists update the answer
            if (index > -1) {
                return update(state, {
                    answers: {[index]: {$set: action.answer}}
                });
            }
            // if teamName is new add a new answer
            return update(state, {
                answers: {$push: [action.answer]}
            });
        case TOGGLE_ANSWER:
            index = -1;
            state.answers.forEach(function (answer, i) {
                if (action.teamName === answer.teamName) {
                    index = i;
                }
            });

            return update(state, {
                answers: {[index]: {approved: {$set: !state.answers[index].approved}}}
            });
        case CLOSE_QUESTION:
            return initialState;
        default:
            return state;
    }
};

export default answerReducer;
