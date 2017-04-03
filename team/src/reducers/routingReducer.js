import update from 'immutability-helper';

import {REGISTER, RECEIVE_REGISTER, WAIT} from '../constants';

const initialState = {
    currentPage: REGISTER
};

const routingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_REGISTER:
            return update(state, {
                currentPage: {$set: WAIT}
            });
        default:
            return state;
    }
};

export default routingReducer;
