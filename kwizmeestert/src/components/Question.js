import React, {Component, PropTypes} from 'react';
import RateAnswers from "./RateAnswers";

class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wasStarted: false
        };
    }

    onToggleActivity() {
        this.setState({wasStarted: true});
        this.props.onToggleActivity(this.props.code, this.props.question.active);
    }

    onStopQuestion() {
        this.props.onStopQuestion(this.props.code, this.props.questionCount);
    }

    render() {
        return (
            <div>
                <h1>Ronde {this.props.roundCount} - Vraag {this.props.questionCount}/6</h1>
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
                <RateAnswers code={this.props.code} answers={this.props.answers} active={this.props.question.active}/>
                <hr/>
                {this.state.wasStarted && !this.props.question.active ?
                    <button onClick={this.onStopQuestion.bind(this)}>Volgende vraag</button>
                    : ''
                }
            </div>
        )
    }
}

Question.propTypes = {
    code: PropTypes.string.isRequired,
    questionCount: PropTypes.number.isRequired,
    roundCount: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    onToggleActivity: PropTypes.func.isRequired,
    onStopQuestion: PropTypes.func.isRequired
};

export default Question;
