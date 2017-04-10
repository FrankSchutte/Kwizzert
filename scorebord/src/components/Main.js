import React, {Component, PropTypes} from 'react';
import {REGISTER, SHOW_CODE, QUIZ, RESULTS} from '../constants';
import RegisterContainer from '../containers/RegisterContainer';
import ShowCodeContainer from '../containers/ShowCodeContainer';
import QuizContainer from '../containers/QuizContainer';
import ResultsContainer from '../containers/ResultsContainer';

class Main extends Component {
    render() {
        let page;
        switch (this.props.currentPage) {
            case REGISTER:
                page = <RegisterContainer/>;
                break;
            case SHOW_CODE:
                page = <ShowCodeContainer/>;
                break;
            case QUIZ:
                page = <QuizContainer/>;
                break;
            case RESULTS:
                page = <ResultsContainer/>;
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

Main.propTypes = {
    currentPage: PropTypes.string.isRequired
};

export default Main;