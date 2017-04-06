import update from 'immutability-helper';

import {RECEIVE_QUESTIONS, CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, STOP_QUESTION, ROUND_FINISHED} from '../constants';

const initialState = {
    questions: [],
    questionCount: 0
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            if (action.success) {
                return update(state, {
                    questions: {$set: action.questions}
                });
            }
            return state;
        case CHOOSE_QUESTION:
            return update(state, {
                activeQuestion: {$set: action.question}
            });
        case TOGGLE_QUESTION_ACTIVITY:
            return update(state, {
                activeQuestion: {active: {$set: !state.activeQuestion.active}}
            });
        case STOP_QUESTION:
        case ROUND_FINISHED:
            return update(state, {
                questionCount: {$set: action.questionCount}
            });
        default:
            return state;
    }
};

export default questionReducer;
