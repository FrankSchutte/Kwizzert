import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class PickQuestion extends Component {

    componentDidMount() {
        const selectedCategories = this.props.categories.filter((category) => {
            return category.approved;
        });

        this.props.fetchQuestions(selectedCategories);
    }

    onQuestionSelect(question) {
        this.props.onQuestionSelect(this.props.code, question);
    }

    render() {
        return (
            <div>
                <h1>Selecteer een vraag</h1>
                {this.props.questions.map((questions) => (
                    <div key={questions.categoryName}>
                        <h2>{questions.categoryName}</h2>
                        {questions.questions.map((question) => (
                            <ListItem
                                key={question._id}
                                checked={question.approved ? 'checked' : ''}
                                name={question.question}
                                onClickHandler={this.onQuestionSelect.bind(this, question)}
                            />)
                        )}
                    </div>
                ))}
            </div>
        )
    }
}

PickQuestion.propTypes = {
    code: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    onQuestionSelect: PropTypes.func.isRequired
};

export default PickQuestion;
