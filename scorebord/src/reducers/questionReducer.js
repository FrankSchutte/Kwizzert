import update from 'immutability-helper';
import {RECEIVE_QUESTION, START_QUESTION, STOP_QUESTION, RESET_QUESTION, ADD_RESULTS, SHOW_ANSWERS} from '../constants';

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

        case SHOW_ANSWERS:
            return update(state, {
                results: {$push: [{
                    teamName: action.message.teamName,
                    answer: action.message.answer,
                    approved: null
                }]}
            });

        case ADD_RESULTS:
            let index;
            state.results.forEach((result, i) => {
                if (result.teamName === action.message.teamName) {
                    index = i;
                }
            });

            if (!index && index !== 0)
                return state;

            return update(state, {
                results: {[index]: {approved: {$set: action.message.approved}}}
            });
        default:
            return state;
    }
};

export default questionReducer;