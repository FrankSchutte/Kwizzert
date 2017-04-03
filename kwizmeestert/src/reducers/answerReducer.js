import update from 'immutability-helper';

import {CONFIRM_ANSWER, TOGGLE_ANSWER, CLOSE_QUESTION} from '../constants';

const initialState = {
    answers: [{
        teamName: 'team 1',
        answer: 'poo poo',
        approved: false
    }, {
        teamName: 'team 2',
        answer: 'pee pee',
        approved: false
    }]
};

const answerReducer = (state = initialState, action) => {
    let index;
    switch (action.type) {
        case CONFIRM_ANSWER:
            state.answers.forEach(function (answer, i) {
                if (action.teamName === answer.teamName) {
                    index = i;
                }
            });

            return update(state, {
                answers: {[index]: {answer: action.answer}}
            });
        case TOGGLE_ANSWER:
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
