import {connect} from 'react-redux';

import CreateQuiz from '../components/CreateQuiz';
import routingActionCreator from '../actions/routingActionCreator';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    onCreateQuiz: () => dispatch(routingActionCreator.createQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
