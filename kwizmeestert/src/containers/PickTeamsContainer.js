import {connect} from 'react-redux';

import PickTeams from '../components/PickTeams';
import QuizActionCreator from '../actions/quizActionCreator';

const mapStateToProps = (state) => ({
    teams: state.teamReducer.teams
});

const mapDispatchToProps = (dispatch) => ({
    onStartQuiz: () => dispatch(QuizActionCreator.startQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(PickTeams);
