import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {CREATE_QUIZ, PICK_TEAMS, PICK_CATEGORIES, PICK_QUESTION, QUESTION} from '../constants';
import CreateQuizContainer from "../containers/CreateQuizContainer";
import PickTeamsContainer from "../containers/PickTeamsContainer";
import PickCategoriesContainer from "../containers/PickCategoriesContainer";
import PickQuestionContainer from '../containers/PickQuestionContainer';
import QuestionContainer from '../containers/QuestionContainer';

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
            case PICK_CATEGORIES:
                page = <PickCategoriesContainer/>;
                break;
            case PICK_QUESTION:
                page = <PickQuestionContainer/>;
                break;
            case QUESTION:
                page = <QuestionContainer/>;
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
        currentPage: state.routingReducer.currentPage
    }
);

export default connect(mapStateToProps)(Main);
