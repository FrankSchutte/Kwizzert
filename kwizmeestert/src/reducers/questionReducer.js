import update from 'immutability-helper';

import {CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, CLOSE_QUESTION} from '../constants';

const initialState = {
    questions: [{
        _id: "iets",
        question: "Hoeveel tenen heeft een geit?",
        answer: "veel",
        category: "DIEREN"
    }, {
        _id: "idieeeee",
        question: "Wat doet de wasmachine?",
        answer: "kfhkjfhakjhak",
        category: "eerste categorie"
    }],
    activeQuestion: {},
    questionCount: 0
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_QUESTION:
            return update(state, {
                activeQuestion: {$set: action.question}
            });
        case TOGGLE_QUESTION_ACTIVITY:
            return update(state, {
                activeQuestion: {active: {$set: !state.activeQuestion.active}}
            });
        case CLOSE_QUESTION:
            //TODO waarom wordt deze niet aangeroepen?
            return update(state, {
                questionCount: {$set: action.questionCount++}
            });
        default:
            return state;
    }
};

export default questionReducer;
