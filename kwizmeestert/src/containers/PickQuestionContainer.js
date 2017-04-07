import {connect} from 'react-redux';

import PickQuestion from '../components/PickQuestion';
import questionActionReducer from '../actions/questionActionCreator'

const mapStateToProps = (state) => ({
    code: state.routingReducer.code,
    categories: state.categoryReducer.categories,
    questions: state.questionReducer.questions
});

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: (categories) => dispatch(questionActionReducer.fetchQuestions(categories)),
    onQuestionSelect: (code, question) => dispatch(questionActionReducer.selectQuestion(code, question))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickQuestion);
