import React, {Component, PropTypes} from 'react';

class ShowCode extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.code}</h2>
            </div>
        )
    }
}

ShowCode.propTypes = {
    code: PropTypes.string.isRequired
};

export default ShowCode;