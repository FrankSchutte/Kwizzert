import React, {Component, PropTypes} from 'react';

class CreateQuiz extends Component {

    onCreateQuiz(e) {
        e.preventDefault();
        this.props.onCreateQuiz();
    }

    render() {
        return (
            <div>
                <h2>Kwiz openen</h2>
                <button onClick={this.onCreateQuiz.bind(this)}>Open</button>
            </div>
        );
    }
}

CreateQuiz.propTypes = {
    onCreateQuiz: PropTypes.func.isRequired
};

export default CreateQuiz;
