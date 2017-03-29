import update from 'immutability-helper';

import {CREATE_QUIZ, SUCCESS_OPEN_QUIZ, ERROR_OPEN_QUIZ, PICK_TEAMS, START_QUIZ, PICK_CATEGORIES} from '../constants';
// import kwizzertWebsocket from '../kwizzertWebsocket';

const initialState = {
    currentPage: CREATE_QUIZ,
    // webSocket: kwizzertWebsocket
};

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_OPEN_QUIZ:
            return update(state, {
                currentPage: {$set: PICK_TEAMS}
            });
        case ERROR_OPEN_QUIZ:
            return state;
        case START_QUIZ:
            return update(state, {
                currentPage: {$set: PICK_CATEGORIES}
            });
        default:
            return state;
    }
};

export default pageReducer;
