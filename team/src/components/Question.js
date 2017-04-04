import React, {Component, PropTypes} from 'react';

class Question extends Component {

    onConfirmAnswer(e) {
        e.preventDefault();

        this.props.confirmAnswer(
            this.props.code,
            this.props.teamName,
            e.target.answer.value
        );
    }

    render() {
        return (
            <div>
                <h1>Vraag</h1>
                <div>
                    Vraag: {this.props.question.question}
                </div>
                <div>
                    <form onSubmit={this.onConfirmAnswer.bind(this)}>
                        Antwoord:
                        <input type="text" id="answer"/>
                        <input type="submit" value="Bevestig"/>
                    </form>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    code: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    confirmAnswer: PropTypes.func.isRequired
};

export default Question;
