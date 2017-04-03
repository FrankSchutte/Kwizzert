import {TOGGLE_TEAM} from '../constants';

const teamActionCreator = {
    toggleTeamApproval(team) {
        return {type: TOGGLE_TEAM, team: team};
    }
};

export default teamActionCreator;
