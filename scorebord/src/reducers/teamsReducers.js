import update from 'immutability-helper';
import {ADD_TEAMS, ADD_SCORE, COUNT_QUESTIONS, CALCULATE_SCORE} from '../constants';

const initialState = {
    teams: [],
    questionNum: 0,
    roundNum: 1,
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
            state.teams.forEach((team, i) => {
                if (team.teamName === action.teamName) {
                    index = i;
                }
            });
            if (!index && index !== 0)
                return state;

            return update(state, {
                teams: {[index]: {roundScore: {$set: state.teams[index].roundScore + 1}}}
            });

        case COUNT_QUESTIONS:
            if (state.questionNum === 12) {
                return update(state, {
                    questionNum: {$set: 1},
                    roundNum: {$set: state.roundNum + 1}
                });
            } else {
                return update(state, {
                    questionNum: {$set: state.questionNum + 1}
                });
            }

        case CALCULATE_SCORE:
            if (state.questionNum === 12) {
                const compare = (a,b) => (b.roundScore-a.roundScore);
                const teamCopy = state.teams.slice(0, state.teams.length);
                teamCopy.sort(compare);

                teamCopy.forEach((team, i) => {
                    if (team.roundScore > 0) {
                        if (i === 0)
                            team.totalScore += 4;
                        else if (i === 1)
                            team.totalScore += 2;
                        else if (i === 2)
                            team.totalScore += 1;
                    } else {
                        team.totalScore += 0.1;
                    }
                    team.roundScore = 0;
                });
                teamCopy.forEach((team) => team.roundScore = 0);
                return update(state, {
                    teams: {$set: teamCopy}
                });
            } else {
                return state;
        }

        default:
            return state;
    }
};

export default teamsReducers;