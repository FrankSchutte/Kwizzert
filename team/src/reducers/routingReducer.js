import update from 'immutability-helper';

import {REGISTER, RECEIVE_REGISTER, WAIT, KICK_TEAM, START_QUESTION, QUESTION, STOP_QUESTION} from '../constants';

const initialState = {
    currentPage: REGISTER
};

const routingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_REGISTER:
            return update(state, {
                currentPage: {$set: WAIT},
                teamName: {$set: action.teamName},
                code: {$set: action.code}
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
