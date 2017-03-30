import {connect} from 'react-redux';

import PickTeams from '../components/PickTeams';
import routingActionCreator from '../actions/routingActionCreator';
import teamActionCreator from '../actions/teamActionCreator';

const mapStateToProps = (state) => ({
    teams: state.teamReducer.teams
});

const mapDispatchToProps = (dispatch) => ({
    onToggleTeam: (team) => dispatch(teamActionCreator.toggleTeamApproval(team)),
    onStartQuiz: () => dispatch(routingActionCreator.startQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeams);
