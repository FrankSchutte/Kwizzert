import {connect} from 'react-redux';

import RoundFinished from '../components/RoundFinished';
import routingActionCreator from '../actions/routingActionCreator';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code
});

const mapDispatchToProps = (dispatch) => ({
    nextRound: () => dispatch(routingActionCreator.nextRound()),
    finishQuiz: (code) => dispatch(routingActionCreator.finishQuiz(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundFinished);
