import update from 'immutability-helper';
import {ADD_TEAMS, ADD_SCORE, INCREASE_QUESTION_COUNT, CALCULATE_SCORE, RESET_QUESTION} from '../constants';

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
                team.receivedScore = false;
            });
            return update(state, {
                teams: {$push: action.teams}
            });

        case ADD_SCORE:
            let index;
            state.teams.forEach((team, i) => {
                if (team.teamName === action.message.teamName) {
                    index = i;
                }
            });
            if (!index && index !== 0)
                return state;

            if (action.message.approved) {
                return update(state, {
                    teams: {
                        [index]: {
                            roundScore: {$set: state.teams[index].roundScore + 1},
                            receivedScore: {$set: true}
                        }
                    }
                });
            }
            else {
                if (state.teams[index].receivedScore) {
                    return update(state, {
                        teams: {
                            [index]: {
                                roundScore: {$set: state.teams[index].roundScore - 1}
                            }
                        }
                    });
                } else {
                    return update(state, {
                        teams: {
                            [index]: {
                                receivedScore: {$set: true}
                            }
                        }
                    });
                }
            }

        case INCREASE_QUESTION_COUNT:
            return update(state, {
                questionNum: {$set: state.questionNum + 1}
            });

        case RESET_QUESTION:
            const teams = state.teams.slice(0, state.teams.length);
            teams.forEach((team) => {
                team.receivedScore = null
            });
            return update(state, {
                teams: {$set: teams}
            });

        case CALCULATE_SCORE:
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
                teams: {$set: teamCopy},
                roundNum: {$set: state.roundNum + 1},
                questionNum: {$set: 0}
            });

        default:
            return state;
    }
};

export default teamsReducers;