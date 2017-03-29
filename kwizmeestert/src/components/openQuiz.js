import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import QuizActionCreator from '../actions/quizActionCreator';

class OpenQuiz extends Component {
    render() {
        return (
            <div>
                <h2>Kwiz openen</h2>
                <button onClick={this.props.onOpenQuiz.bind(this)}>Open</button>
            </div>
        );
    }
}

OpenQuiz.propTypes = {
    onOpenQuiz: PropTypes.func.isRequired
};

const mapStateToProps = (state) => (
    {}
);

const mapDispatchToProps = (dispatch) => (
    {
        onOpenQuiz: () => dispatch(QuizActionCreator.openQuiz())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(OpenQuiz);
