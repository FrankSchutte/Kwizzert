import {connect} from 'react-redux';

import PickCategories from '../components/PickCategories';
import categoryActionCreator from '../actions/categoryActionCreator'
import routingActionCreator from '../actions/routingActionCreator';

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(categoryActionCreator.fetchCategories()),
    onToggleCategory: (category) => dispatch(categoryActionCreator.toggleCategorySelected(category)),
    onStartRound: (categories) => dispatch(routingActionCreator.startRound(categories))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickCategories);
