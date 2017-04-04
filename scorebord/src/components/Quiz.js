import React, {Component, PropTypes} from 'react';

class Quiz extends Component {
    render() {
        const teamInfo = this.props.teams.map((team) =>
            <div key={team.teamName}>
                <ul>
                    <li>Team naam: {team.teamName}</li>
                    <li>Punten in deze ronde: {team.roundScore}</li>
                    <li>Totale rondepunten: {team.totalScore}</li>
                </ul>
            </div>
        );
        console.log(teamInfo);
        return (
            <div>{teamInfo}</div>
    )};
}

Quiz.propTypes = {
    teams: PropTypes.array.isRequired
};

export default Quiz;