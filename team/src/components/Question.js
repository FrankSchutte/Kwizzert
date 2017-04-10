import React, {Component, PropTypes} from 'react';

import Box from './styling/Box';
import CenterText from './styling/CenterText';
import InputField from './styling/InputField';

class Question extends Component {

    onSendAnswer(e) {
        e.preventDefault();

        this.props.sendAnswer(
            this.props.code,
            this.props.teamName,
            e.target.answer.value
        );
    }

    render() {
        return (
            <CenterText>
                <div>
                    <h3>Vraag | Categorie {this.props.question.category}</h3>
                    {this.props.question.question}
                </div>
                <div className="questionFormContainer">
                    <form onSubmit={this.onSendAnswer.bind(this)}>
                        <InputField id="answer" label="Antwoord"/>
                        <input type="submit" value="Bevestig"/>
                    </form>
                </div>
            </CenterText>
        )
    }
}

Question.propTypes = {
    code: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    sendAnswer: PropTypes.func.isRequired
};

export default Question;
