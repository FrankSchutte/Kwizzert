import React, {Component, PropTypes} from 'react';
import RateAnswer from "./RateAnswer";
import kwizzertWebSocket from '../kwizzertWebSocket';

class RateAnswers extends Component {

    onRateAnswer(answer, approved) {
        kwizzertWebSocket.rateAnswer(this.props.code, answer, approved);
    }

    render() {
        return (
            <div>
                <span>G | F</span>
                {this.props.answers.map((answer) => (
                    <RateAnswer
                        key={answer.teamName}
                        teamName={answer.teamName}
                        answer={answer.answer}
                        active={this.props.active}
                        onClickHandler={this.onRateAnswer.bind(this, answer)}
                    />)
                )}
            </div>
        )
    }
}

RateAnswers.propTypes = {
    code: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    active: PropTypes.bool.isRequired
};

export default RateAnswers;
