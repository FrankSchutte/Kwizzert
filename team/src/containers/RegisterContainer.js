import {connect} from 'react-redux';

import registerActionCreator from '../actions/registerActionCreator';
import Register from '../components/Register';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    onRegister: (team, code) => dispatch(registerActionCreator.register(team, code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
