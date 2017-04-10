import React, {Component, PropTypes} from 'react';

class RoundFinished extends Component {

    onNextRound() {
        this.props.nextRound();
    }

    onFinishQuiz() {
        this.props.finishQuiz(this.props.code);
    }

    render() {
        return (
            <div>
                <h1>Ronde is afgelopen!</h1>
                <button onClick={this.onNextRound.bind(this)}>Volgende ronde</button>
                <button onClick={this.onFinishQuiz.bind(this)}>Kwiz beëindigen</button>
            </div>
        )
    }
}

RoundFinished.propTypes = {
    code: PropTypes.string.isRequired,
    nextRound: PropTypes.func.isRequired,
    finishQuiz: PropTypes.func.isRequired
};

export default RoundFinished;
