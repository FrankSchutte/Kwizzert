import update from 'immutability-helper';

import {REGISTER, RECEIVE_REGISTER, WAIT, KICK_TEAM, START_QUESTION, QUESTION, STOP_QUESTION} from '../constants';

const initialState = {
    currentPage: REGISTER,
    quiz_found: null
};

const routingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_REGISTER:
            if (action.success) {
                return update(state, {
                    currentPage: {$set: WAIT},
                    teamName: {$set: action.teamName},
                    code: {$set: action.code},
                    quiz_found: {$set: true}
                });
            }
            return update(state, {
                quiz_found: {$set: false}
            });
        case KICK_TEAM:
            return update(state, {
                currentPage: {$set: REGISTER}
            });
        case START_QUESTION:
            return update(state, {
                currentPage: {$set: QUESTION}
            });
        case STOP_QUESTION:
            return update(state, {
                currentPage: {$set: WAIT}
            });
        default:
            return state;
    }
};

export default routingReducer;
