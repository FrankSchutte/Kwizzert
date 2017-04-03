import React, {Component, PropTypes} from 'react';

class List extends Component {
    render() {
        return (
            <div>
                <span>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        onClick={this.props.onClickHandler}
                    />
                    {this.props.name}
                </span>
                <hr/>
            </div>
        )
    }
}

List.propTypes = {
    checked: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default List;
