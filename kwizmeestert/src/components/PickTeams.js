import React, {Component, PropTypes} from 'react';

import ApproveTeam from './ApproveTeam';

class PickTeams extends Component {
    onStartQuiz = () => {
        this.props.onStartQuiz();
    };

    render() {
        const approveTeams = this.props.teams.map((team) => <ApproveTeam key={team.name} name={team.name} approved={team.approved}/>);

        return (
            <div>
                <h1>Pick Teams</h1>
                {approveTeams}
                <button onClick={this.onStartQuiz}>Starten</button>
            </div>
        )
    }
}

PickTeams.propTypes = {
    teams: PropTypes.array.isRequired,
    webSocket: PropTypes.instanceOf(WebSocket).isRequired,
    onStartQuiz: PropTypes.func.isRequired
};

export default PickTeams;
