import {connect} from 'react-redux';

import Question from '../components/Question';
import questionActionCreator from '../actions/questionActionCreator';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    teamName: state.routingReducer.teamName,
    question: state.questionReducer.question
});

const mapDispatchToProps = (dispatch) => ({
    sendAnswer: (code, teamName, answer) => dispatch(questionActionCreator.sendAnswer(code, teamName, answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
