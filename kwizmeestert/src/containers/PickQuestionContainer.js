import {connect} from 'react-redux';

import PickQuestion from '../components/PickQuestion';
import questionActionReducer from '../actions/questionActionCreator'

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    questions: state.questionReducer.questions
});

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: () => dispatch(questionActionReducer.fetchQuestions()),
    onQuestionSelect: (question) => dispatch(questionActionReducer.chooseQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickQuestion);
