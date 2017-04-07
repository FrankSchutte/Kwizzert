import {connect} from 'react-redux';
import Register from '../components/Register';
import routingActionCreator from '../actions/routingActionCreator';

const mapDispatchToProps = (dispatch) => ({
    onRegister: (code) => dispatch(routingActionCreator.register(code))
});

export default connect(null, mapDispatchToProps)(Register);