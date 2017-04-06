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
                        onClickHandler={this.onRateAnswer.bind(this, answer)}
                    />)
                )}
            </div>
        )
    }
}

RateAnswers.propTypes = {
    answers: PropTypes.array.isRequired
};

export default RateAnswers;
