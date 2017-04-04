import update from 'immutability-helper';
import {ADD_TEAMS} from '../constants';

const initialState = {
    teams: [{
        teamName: 'team1',
        roundScore: 7,
        totalScore: 1
    }, {
        teamName: 'team2',
        roundScore: 11,
        totalScore: 4
    }, {
        teamName: 'team3',
        roundScore: 2,
        totalScore: 3
    }]
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
        default:
            return state;
    }
};

export default teamsReducers;