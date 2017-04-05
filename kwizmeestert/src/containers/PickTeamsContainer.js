import {connect} from 'react-redux';

import PickTeams from '../components/PickTeams';
import routingActionCreator from '../actions/routingActionCreator';
import teamActionCreator from '../actions/teamActionCreator';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    teams: state.teamReducer.teams
});

const mapDispatchToProps = (dispatch) => ({
    onToggleTeam: (code, team) => dispatch(teamActionCreator.toggleTeamApproval(code, team)),
    onStartQuiz: (code, teams) => dispatch(routingActionCreator.startQuiz(code, teams))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeams);
