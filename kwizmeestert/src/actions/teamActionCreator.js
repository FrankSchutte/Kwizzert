import {ADD_TEAM, TOGGLE_TEAM} from '../constants';
import kwizzertWebSocket from '../kwizzertWebSocket';

const teamActionCreator = {
    addTeam(teamName) {
        return {type: ADD_TEAM, teamName: teamName};
    },
    toggleTeamApproval(code, team) {
        kwizzertWebSocket.kickTeam(code, team);
        return {type: TOGGLE_TEAM, team: team};
    }
};

export default teamActionCreator;
