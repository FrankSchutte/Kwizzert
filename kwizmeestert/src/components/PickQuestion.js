import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class PickQuestion extends Component {

    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        const questions = this.props.questions.map((question) => (
            <ListItem
                key={question._id}
                checked={question.approved ? 'checked' : ''}
                name={question.question}
                onClickHandler={this.props.onQuestionSelect.bind(this, question)}
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
    categories: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    onQuestionSelect: PropTypes.func.isRequired
};

export default PickQuestion;
