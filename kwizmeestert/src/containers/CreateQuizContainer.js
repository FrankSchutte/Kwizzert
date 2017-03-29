import {connect} from 'react-redux';

import CreateQuiz from '../components/CreateQuiz';
import QuizActionCreator from '../actions/quizActionCreator';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    onOpenQuiz: () => dispatch(QuizActionCreator.openQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
