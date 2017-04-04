import React, {Component, PropTypes} from 'react';

import ListItem from './ListItem';

class PickTeams extends Component {

    onToggleTeam = (team) => {
        this.props.onToggleTeam(this.props.code, team);
    };

    onStartQuiz = () => {
        this.props.onStartQuiz(this.props.code, this.props.teams);
    };

    render() {
        const teams = this.props.teams.map((team) => (
            <ListItem
                key={team.teamName}
                checked={team.approved ? 'checked' : ''}
                name={team.teamName}
                onClickHandler={this.onToggleTeam.bind(this, team)}
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
    code: PropTypes.string.isRequired,
    teams: PropTypes.array.isRequired,
    onToggleTeam: PropTypes.func.isRequired,
    onStartQuiz: PropTypes.func.isRequired
};

export default PickTeams;
