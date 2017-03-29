import React, {Component, PropTypes} from 'react';

class ApproveTeam extends Component {
    render() {
        return (
            <div>
                <span>{this.props.name} Approved<input type="checkbox" checked={this.props.approved ? 'checked' : ''}/></span>
                <hr/>
            </div>
        )
    }
}

ApproveTeam.propTypes = {
    name: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired
};

export default ApproveTeam;
