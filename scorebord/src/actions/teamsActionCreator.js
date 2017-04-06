import {ADD_TEAMS, ADD_SCORE} from '../constants';

const teamsActionCreator = {
    addTeams(teams) {
        return {type: ADD_TEAMS, teams: teams};
    },
    addScore(teamName) {
        return {type: ADD_SCORE, teamName: teamName};
    }
};

export default teamsActionCreator;