import {connect} from 'react-redux';

import PickQuestion from '../components/PickQuestion';
import questionActionReducer from '../actions/questionActionCreator'

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    questions: state.questionReducer.questions
});

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: () => dispatch(questionActionReducer.fetchQuestions()),
    onQuestionSelect: (code, question) => dispatch(questionActionReducer.selectQuestion(code, question))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickQuestion);
