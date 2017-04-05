import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class Question extends Component {

    onToggleActivity() {
        this.props.onToggleActivity(this.props.code, this.props.question.active);
    }

    onToggleAnswer(answer) {
        this.props.onToggleAnswer(this.props.code, answer);
    }

    onStopQuestion() {
        this.props.onStopQuestion(this.props.code, this.props.questionCount);
    }

    render() {
        return (
            <div>
                <h1>Vraag {this.props.questionCount + 1}/12</h1>
                <div>
                    <button onClick={this.onToggleActivity.bind(this)}>
                        {!this.props.question.active ? 'Start' : 'Sluit'} vraag
                    </button>
                </div>
                <hr/>
                <div>
                    <span>Vraag: {this.props.question.question}</span>
                </div>
                <div>
                    <span>Antwoord: {this.props.question.answer}</span>
                </div>
                <hr/>
                {this.props.answers.map((answer) => (
                    <ListItem
                        key={answer.teamName}
                        checked={answer.approved ? 'checked' : ''}
                        name={answer.teamName + ' ' + answer.answer}
                        onClickHandler={this.onToggleAnswer.bind(this, answer)}
                    />)
                )}
                <hr/>
                <button onClick={this.onStopQuestion.bind(this)}>Volgende vraag</button>
            </div>
        )
    }
}

Question.propTypes = {
    code: PropTypes.string.isRequired,
    questionCount: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    onToggleActivity: PropTypes.func.isRequired,
    onToggleAnswer: PropTypes.func.isRequired,
    onStopQuestion: PropTypes.func.isRequired
};

export default Question;
