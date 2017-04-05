import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class Question extends Component {

    onToggleActivity() {
        //TODO discuss to change TOGGLE_QUESTION with active: true | false? problem arise because we need 2 kinds of close questions
        this.props.onToggleActivity(this.props.code);
    }

    onToggleAnswer(answer) {
        this.props.onToggleAnswer(this.props.code, answer);
    }

    onCloseQuestion() {
        this.props.onCloseQuestion(this.props.code, this.props.questionCount);
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
                <button onClick={this.onCloseQuestion.bind(this)}>Volgende vraag</button>
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
    onCloseQuestion: PropTypes.func.isRequired
};

export default Question;
