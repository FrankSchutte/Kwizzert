import {connect} from 'react-redux';

import Question from '../components/Question';
import questionActionCreator from '../actions/questionActionCreator';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    questionCount: state.questionReducer.questionCount,
    roundCount: state.questionReducer.roundCount,
    question: state.questionReducer.activeQuestion,
    answers: state.answerReducer.answers
});

const mapDispatchToProps = (dispatch) => ({
    onToggleActivity: (code, active) => dispatch(questionActionCreator.toggleActivity(code, active)),
    onStopQuestion: (code, questionCount) => dispatch(questionActionCreator.stopQuestion(code, questionCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
