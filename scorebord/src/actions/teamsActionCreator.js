import {ADD_TEAMS} from '../constants';

const teamsActionCreator = {
    addTeams(teams) {
        return {type: ADD_TEAMS, teams: teams};
    }
};

export default teamsActionCreator;