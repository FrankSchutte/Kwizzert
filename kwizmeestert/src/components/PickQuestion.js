import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class PickQuestion extends Component {

    componentDidMount() {
        this.props.fetchQuestions();
    }

    onQuestionSelect(question) {
        this.props.onQuestionSelect(this.props.code, question);
    }

    render() {
        const questions = this.props.questions.map((question) => (
            <ListItem
                key={question._id}
                checked={question.approved ? 'checked' : ''}
                name={question.question}
                onClickHandler={this.onQuestionSelect.bind(this, question)}
            />
        ));

        return (
            <div>
                <h1>Selecteer een vraag</h1>
                {questions}
            </div>
        )
    }
}

PickQuestion.propTypes = {
    fetchQuestions: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
    onQuestionSelect: PropTypes.func.isRequired
};

export default PickQuestion;
