import {connect} from 'react-redux';
import Main from '../components/Main';

const mapStateToProps = (state) => ({
    currentPage: state.routingReducer.currentPage
});

export default connect(mapStateToProps)(Main);