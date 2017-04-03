import React, {Component} from 'react';
import {connect} from 'react-redux';

import {REGISTER, WAIT} from '../constants';
import RegisterContainer from '../containers/RegisterContainer';
import WaitContainer from "../containers/WaitContainer";

class Main extends Component {
    render() {
        let page;
        switch (this.props.currentPage) {
            case REGISTER:
                page = <RegisterContainer/>;
                break;
            case WAIT:
                page = <WaitContainer/>;
                break;
            default:
                page = <RegisterContainer/>;
                break;
        }

        return (
            <div>
                {page}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentPage: state.routingReducer.currentPage
});

export default connect(mapStateToProps)(Main);
