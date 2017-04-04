import update from 'immutability-helper';

import {RECEIVE_QUESTIONS, CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, CLOSE_QUESTION, CLOSE_ROUND} from '../constants';

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
        case CLOSE_QUESTION:
        case CLOSE_ROUND:
            console.log(action.questionCount);
            return update(state, {
                questionCount: {$set: action.questionCount}
            });
        default:
            return state;
    }
};

export default questionReducer;
