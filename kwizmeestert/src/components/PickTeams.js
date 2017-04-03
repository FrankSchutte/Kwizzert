import React, {Component, PropTypes} from 'react';

import ListItem from './ListItem';

class PickTeams extends Component {
    onStartQuiz = () => {
        this.props.onStartQuiz();
    };

    render() {
        const teams = this.props.teams.map((team) => (
            <ListItem
                key={team.teamName}
                checked={team.approved ? 'checked' : ''}
                name={team.teamName}
                onClickHandler={this.props.onToggleTeam.bind(this, team)}
            />)
        );

        return (
            <div>
                <h1>Teams kiezen</h1>
                {teams}
                <button onClick={this.onStartQuiz}>Starten</button>
            </div>
        )
    }
}

PickTeams.propTypes = {
    teams: PropTypes.array.isRequired,
    onToggleTeam: PropTypes.func.isRequired,
    onStartQuiz: PropTypes.func.isRequired
};

export default PickTeams;
