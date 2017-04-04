import {connect} from 'react-redux';
import Quiz from '../components/Quiz';

const mapStateToProps = (state) => ({
    teams: state.teamsReducer.teams
});

export default connect(mapStateToProps)(Quiz);