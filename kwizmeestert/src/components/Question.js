import React, {Component, PropTypes} from 'react';
import RateAnswer from "./RateAnswer";
import kwizzertWebSocket from '../kwizzertWebSocket';

class Question extends Component {

    onToggleActivity() {
        this.props.onToggleActivity(this.props.code, this.props.question.active);
    }

    onRateAnswer(answer, approved) {
        kwizzertWebSocket.rateAnswer(this.props.code, answer, approved);
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
                    <RateAnswer
                        key={answer.teamName}
                        teamName={answer.teamName}
                        answer={answer.answer}
                        onClickHandler={this.onRateAnswer.bind(this, answer)}
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
    onStopQuestion: PropTypes.func.isRequired
};

export default Question;
