import update from 'immutability-helper';

import {SEND_ANSWER, TOGGLE_ANSWER, STOP_QUESTION} from '../constants';

const initialState = {
    answers: []
};

const answerReducer = (state = initialState, action) => {
    let index;
    switch (action.type) {
        case SEND_ANSWER:
            index = -1;
            state.answers.forEach(function (answer, i) {
                if (action.answer.teamName === answer.teamName) {
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
        case STOP_QUESTION:
            return initialState;
        default:
            return state;
    }
};

export default answerReducer;
