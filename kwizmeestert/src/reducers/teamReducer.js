import update from 'immutability-helper';

import {ADD_TEAM, TOGGLE_TEAM} from '../constants';

const initialState = {
    teams: [{
        teamName: 'team 1'
    }, {
        teamName: 'team 2'
    }, {
        teamName: 'team 3'
    }]
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return update(state, {
                teams: {$push: [{teamName: action.teamName}]}
            });
        case TOGGLE_TEAM:
            let index;
            state.teams.forEach(function (team, i) {
                if(action.team === team) {
                    index = i;
                }
            });

            return update(state, {
                teams: {[index]: {approved: {$set: !state.teams[index].approved}}}
            });
        default:
            return state;
    }
};

export default teamReducer;
