import React, {Component, PropTypes} from 'react';
import CenterText from './styling/CenterText';

class ShowCode extends Component {
    render() {
        return (
            <CenterText>
                <h2>{this.props.code}</h2>
            </CenterText>
        )
    }
}

ShowCode.propTypes = {
    code: PropTypes.string.isRequired
};

export default ShowCode;