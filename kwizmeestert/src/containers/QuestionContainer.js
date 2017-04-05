import {connect} from 'react-redux';

import Question from '../components/Question';
import questionActionCreator from '../actions/questionActionCreator';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    questionCount: state.questionReducer.questionCount,
    question: state.questionReducer.activeQuestion,
    answers: state.answerReducer.answers
});

const mapDispatchToProps = (dispatch) => ({
    onToggleActivity: (code) => dispatch(questionActionCreator.toggleActivity(code)),
    onToggleAnswer: (code, answer) => dispatch(questionActionCreator.toggleAnswer(code, answer)),
    onCloseQuestion: (code, questionCount) => dispatch(questionActionCreator.closeQuestion(code, questionCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
