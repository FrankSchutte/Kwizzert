import {connect} from 'react-redux';
import Register from '../components/Register';
import routingActionCreator from '../actions/routingActionCreator';

const mapStateToProps = (state) => ({
    quiz_found: state.routingReducer.quiz_found
});

const mapDispatchToProps = (dispatch) => ({
    onRegister: (code) => dispatch(routingActionCreator.register(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);