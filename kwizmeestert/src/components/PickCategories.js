import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class PickCategories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    onStartRound() {
        const selectedCategories = this.props.categories.filter((val) => {
            return val.approved;
        });

        this.props.onStartRound(selectedCategories);
    }

    render() {
        const categories = this.props.categories.map((category) => (
            <ListItem
                key={category.categoryName}
                checked={category.approved ? 'checked' : ''}
                name={category.categoryName}
                onClickHandler={this.props.onToggleCategory.bind(this, category)}
            />)
        );

        return (
            <div>
                <h1>Selecteer drie categorieën</h1>
                {categories}
                <button onClick={this.onStartRound.bind(this)}>Start ronde</button>
            </div>
        )
    }
}

PickCategories.propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    onToggleCategory: PropTypes.func.isRequired,
    onStartRound: PropTypes.func.isRequired
};

export default PickCategories;
