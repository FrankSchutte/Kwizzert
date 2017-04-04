import React, {Component, PropTypes} from 'react';
import {SHOW_CODE, QUIZ, RESULTS} from '../constants';
import ShowCode from '../components/ShowCode';
import QuizContainer from '../containers/QuizContainer';
import Results from '../components/Results';

class Main extends Component {
    render() {
        let page;
        switch (this.props.currentPage) {
            case SHOW_CODE:
                page = <ShowCode/>;
                break;
            case QUIZ:
                page = <QuizContainer/>;
                break;
            case RESULTS:
                page = <Results/>;
                break;
            default:
                page = 'FAILED';
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