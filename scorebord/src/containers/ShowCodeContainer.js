import {connect} from 'react-redux';
import ShowCode from '../components/ShowCode';

const mapStateToProps = (state) => ({
    code: state.routingReducer.code
});

export default connect(mapStateToProps)(ShowCode);