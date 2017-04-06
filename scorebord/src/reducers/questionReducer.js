import update from 'immutability-helper';
import {RECEIVE_QUESTION, START_QUESTION, STOP_QUESTION, RESET_QUESTION, SHOW_RESULTS} from '../constants';

const initialState = {
    question: null,
    status: 'invisible',
    results: []
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_QUESTION:
            return update(state, {
                question: {$set: action.question}
            });

        case START_QUESTION:
            return update(state, {
                status: {$set: 'visible'}
            });

        case STOP_QUESTION:
            return update(state, {
                status: {$set: 'answer'}
            });

        case RESET_QUESTION:
            return update(state, {
                question: {$set: null},
                status: {$set: 'invisible'},
                results: {$set: []}
            });

        case SHOW_RESULTS:
            return update(state, {
                results: {$push: [{
                    teamName: action.message.teamName,
                    answer: action.message.answer,
                    approved: action.message.approved}
                    ]
                }
            });

        default:
            return state;
    }
};

export default questionReducer;