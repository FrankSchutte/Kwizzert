import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {CREATE_QUIZ, PICK_TEAMS} from '../constants';
import CreateQuizContainer from "../containers/CreateQuizContainer";
import PickTeamsContainer from "../containers/PickTeamsContainer";
import './App.css';

class Main extends Component {
    render() {
        let page;
        switch (this.props.currentPage) {
            case CREATE_QUIZ:
                page = <CreateQuizContainer/>;
                break;
            case PICK_TEAMS:
                page = <PickTeamsContainer/>;
                break;
            default:
                page = <CreateQuizContainer/>;
                break;
        }

        return (
            <div>
                {page}
            </div>
        );
    }
}

Main.propTypes = {
    currentPage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => (
    {
        currentPage: state.pageReducer.currentPage
    }
);

export default connect(mapStateToProps)(Main);
