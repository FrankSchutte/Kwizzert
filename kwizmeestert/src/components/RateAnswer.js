import React, {Component, PropTypes} from 'react';

class RateAnswer extends Component {

    onClickHandler(approved) {
        this.props.onClickHandler(approved);
    }

    render() {
        return (
            <div>
                <span>Correct | Wrong</span>
                <span>
                    <input
                        type="radio"
                        name={this.props.teamName}
                        onClick={this.onClickHandler.bind(this, true)}/> |
                    <input
                        type="radio"
                        name={this.props.teamName}
                        onClick={this.onClickHandler.bind(this,false)}/>
                    {this.props.teamName} {this.props.answer}
                </span>
                <hr/>
            </div>
        )
    }
}

RateAnswer.propTypes = {
    teamName: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default RateAnswer;
