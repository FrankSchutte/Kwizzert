import {connect} from 'react-redux';

import registerActionCreator from '../actions/registerActionCreator';
import Register from '../components/Register';

const mapStateToProps = (state) => ({
    quiz_found: state.routingReducer.quiz_found
});

const mapDispatchToProps = (dispatch) => ({
    onRegister: (code, teamName) => dispatch(registerActionCreator.register(code, teamName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);