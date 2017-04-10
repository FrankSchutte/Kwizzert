import update from 'immutability-helper';

import {RECEIVE_QUESTIONS, CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, STOP_QUESTION, FINISH_ROUND, FINISH_QUIZ} from '../constants';

const initialState = {
    questions: [],
    questionCount: 1,
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
            const question = action.question;
            question.active = false;

            return update(state, {
                activeQuestion: {$set: question}
            });
        case TOGGLE_QUESTION_ACTIVITY:
            return update(state, {
                activeQuestion: {active: {$set: !state.activeQuestion.active}}
            });
        case STOP_QUESTION:
            return update(state, {
                questionCount: {$set: state.questionCount + 1}
            });
        case FINISH_ROUND:
            return update(state, {
                questionCount: {$set: initialState.questionCount},
                roundCount: {$set: state.roundCount + 1},
                questions: {$set: []}
            });
        case FINISH_QUIZ:
            return update(state, {
                questionCount: {$set: initialState.questionCount},
                roundCount: {$set: initialState.roundCount}
            });
        default:
            return state;
    }
};

export default questionReducer;
