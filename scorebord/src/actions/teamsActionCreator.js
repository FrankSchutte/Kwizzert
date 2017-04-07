import {ADD_TEAMS, ADD_SCORE, CALCULATE_SCORE} from '../constants';

const teamsActionCreator = {
    addTeams(teams) {
        return {type: ADD_TEAMS, teams: teams};
    },
    addScore(message) {
        return {type: ADD_SCORE, message: message};
    },
    calculateScore() {
        return {type: CALCULATE_SCORE};
    }
};

export default teamsActionCreator;