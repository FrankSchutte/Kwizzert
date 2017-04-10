import React, {Component, PropTypes} from 'react';
import ListItem from "./ListItem";

class PickCategories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    hasSelectedCategory() {
        const selectedCategories = this.props.categories.filter((category) => {
            return category.approved;
        });

        return selectedCategories.length > 0;
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
                {
                    this.hasSelectedCategory() ?
                        <button onClick={this.props.onStartRound}>Start ronde</button> :
                        ''
                }
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
