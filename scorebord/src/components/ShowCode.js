import React, {Component, PropTypes} from 'react';
import CenterTextHZ from './styling/CenterTextHZ';

class ShowCode extends Component {
    render() {
        return (
            <CenterTextHZ>
                <h2>{this.props.code}</h2>
            </CenterTextHZ>
        )
    }
}

ShowCode.propTypes = {
    code: PropTypes.string.isRequired
};

export default ShowCode;