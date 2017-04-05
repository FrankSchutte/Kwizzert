import {connect} from 'react-redux';

import registerActionCreator from '../actions/registerActionCreator';
import Register from '../components/Register';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    onRegister: (code, teamName) => dispatch(registerActionCreator.register(code, teamName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
