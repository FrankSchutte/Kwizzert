import update from 'immutability-helper';

import {ADD_TEAM, TOGGLE_TEAM} from '../constants';

const initialState = {
    teams: []
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return update(state, {
                teams: {$push: [{teamName: action.teamName}]}
            });
        case TOGGLE_TEAM:
            const teams = state.teams.filter((team) => team !== action.team);

            return update(state, {
                teams: {$set: teams}
            });
        default:
            return state;
    }
};

export default teamReducer;
