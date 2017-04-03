import {ADD_TEAM, TOGGLE_TEAM} from '../constants';

const teamActionCreator = {
    addTeam(teamName) {
        return {type: ADD_TEAM, teamName: teamName};
    },
    toggleTeamApproval(team) {
        return {type: TOGGLE_TEAM, team: team};
    }
};

export default teamActionCreator;
