import React, {Component, PropTypes} from 'react';

class CreateQuiz extends Component {
    render() {
        return (
            <div>
                <h2>Kwiz openen</h2>
                <button onClick={this.props.onCreateQuiz}>Open</button>
            </div>
        );
    }
}

CreateQuiz.propTypes = {
    onCreateQuiz: PropTypes.func.isRequired
};

export default CreateQuiz;
