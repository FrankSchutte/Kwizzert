import update from 'immutability-helper';
import {ADD_TEAMS, ADD_SCORE} from '../constants';

const initialState = {
    teams: []
};

const teamsReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAMS:
            action.teams.forEach((team) => {
                team.roundScore = 0;
                team.totalScore = 0;
            });
            return update(state, {
                teams: {$push: action.teams}
            });
        case ADD_SCORE:
            let index;
            console.log(action);
            state.teams.forEach((team, i) => {
                if (team.teamName === action.teamName) {
                    console.log('INDEX GEVONDEN');
                    index = i;
                }
            });
            if (!index && index !== 0) {
                console.log('GEEN INDEX GEVONDEN');
                return state;
            }

            return update(state, {
                teams: {[index]: {$set: state.teams[index].roundScore++}}
            });
        default:
            return state;
    }
};

export default teamsReducers;