import update from 'immutability-helper';

import {RECEIVE_CATEGORIES, TOGGLE_CATEGORY, FINISH_ROUND} from '../constants';

const initialState = {
    categories: []
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            if(action.success) {
                return update(state, {
                    categories: {$set: action.categories}
                });
            }
            return state;
        case TOGGLE_CATEGORY:
            let index;
            state.categories.forEach((category, i) => {
                if(action.category === category) {
                    index = i;
                }
            });

            return update(state, {
                categories: {[index]: {approved: {$set: !state.categories[index].approved}}}
            });
        case FINISH_ROUND:
            return update(state, {
                categories: {$set: []}
            });
        default:
            return state;
    }
};

export default categoryReducer;
