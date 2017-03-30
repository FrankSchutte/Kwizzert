import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class Question extends Component {
    render() {
        return (
            <div>
                <h1>Vraag {this.props.questionCount}/12</h1>
                <div>
                    <button onClick={this.props.onToggleQuestionActivity}>
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
                        onClickHandler={this.props.onToggleAnswer.bind(this, answer.teamName)}
                    />)
                )}
                <hr/>
                <button onClick={this.props.onCloseQuestion.bind(this, this.props.questionCount)}>Volgende vraag</button>
            </div>
        )
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    questionCount: PropTypes.number.isRequired,
    onToggleQuestionActivity: PropTypes.func.isRequired,
    answers: PropTypes.array.isRequired,
    onToggleAnswer: PropTypes.func.isRequired,
    onCloseQuestion: PropTypes.func.isRequired
};

export default Question;
