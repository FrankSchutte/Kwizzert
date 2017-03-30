import {connect} from 'react-redux';

import Question from '../components/Question';
import questionActionCreator from '../actions/questionActionCreator';

const mapStateToProps = (state) => ({
    question: state.questionReducer.activeQuestion,
    questionCount: state.questionReducer.questionCount,
    answers: state.answerReducer.answers
});

const mapDispatchToProps = (dispatch) => ({
    onToggleQuestionActivity: () => dispatch(questionActionCreator.toggleQuestionActivity()),
    onToggleAnswer: (teamName) => dispatch(questionActionCreator.toggleAnswer(teamName)),
    onCloseQuestion: (questionCount) => dispatch(questionActionCreator.closeQuestion(questionCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
