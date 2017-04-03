import {REQUEST_CATEGORIES, RECEIVE_CATEGORIES, TOGGLE_CATEGORY} from '../constants';
import KwizzertAPI from '../kwizzertAPI';

const categoryActionCreator = {
    fetchCategories() {
        return (dispatch) => {
            dispatch({type: REQUEST_CATEGORIES});
            KwizzertAPI.fetchCategories((err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_CATEGORIES, success: false});
                } else {
                    dispatch({type: RECEIVE_CATEGORIES, success: true, categories: res});
                }
            });
        };
    },
    toggleCategorySelected(category) {
        return {type: TOGGLE_CATEGORY, category: category};
    }
};

export default categoryActionCreator;
