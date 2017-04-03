

import {RECEIVE_REGISTER} from '../constants';

const initialState = {

};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_REGISTER:
            return state;
        default:
            return state;
    }
};

export default teamReducer;
