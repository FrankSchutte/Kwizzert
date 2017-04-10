import {connect} from 'react-redux';
import Results from '../components/Results';

const mapStateToProps = (state) => ({
    teams: state.teamsReducer.teams
});

export default connect(mapStateToProps)(Results);