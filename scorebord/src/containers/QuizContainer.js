import {connect} from 'react-redux';
import Quiz from '../components/Quiz';

const mapStateToProps = (state) => ({
    teams: state.teamsReducer.teams,
    question: state.questionReducer.question,
    status: state.questionReducer.status,
    results: state.questionReducer.results,
    questionNum: state.teamsReducer.questionNum,
    roundNum: state.teamsReducer.roundNum
});

export default connect(mapStateToProps)(Quiz);