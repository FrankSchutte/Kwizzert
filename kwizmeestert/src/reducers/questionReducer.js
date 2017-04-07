import update from 'immutability-helper';

import {RECEIVE_QUESTIONS, CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, FINISH_ROUND} from '../constants';

const initialState = {
    questions: [],
    questionCount: 0,
    roundCount: 1
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            if (action.success) {
                const questions = {
                    categoryName: action.categoryName,
                    questions: action.questions
                };

                return update(state, {
                    questions: {$push: [questions]}
                });
            }
            return state;
        case CHOOSE_QUESTION:
            return update(state, {
                activeQuestion: {$set: action.question},
                questionCount: {$set: state.questionCount + 1}
            });
        case TOGGLE_QUESTION_ACTIVITY:
            return update(state, {
                activeQuestion: {active: {$set: !state.activeQuestion.active}}
            });
        case FINISH_ROUND:
            return update(state, {
                questionCount: {$set: 0},
                roundCount: {$set: state.roundCount + 1}
            });
        default:
            return state;
    }
};

export default questionReducer;
