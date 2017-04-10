import React, {Component, PropTypes} from 'react';
import CenterText from './styling/CenterText';

class Results extends Component {
    render() {
        const winner = `${this.props.teams[0].teamName} heeft gewonnen met ${this.props.teams[0].totalScore} punten!`;

        let secondplace;
        if (this.props.teams.length > 1)
            secondplace = `2e plaats: ${this.props.teams[1].teamName} met ${this.props.teams[1].totalScore} punten!`;
        else secondplace = '';

        let thirdplace;
        if (this.props.teams.length > 2)
            thirdplace = `3e plaats: ${this.props.teams[2].teamName} met ${this.props.teams[2].totalScore} punten!`;
        else thirdplace = '';

        return (
            <CenterText>
                <h1>{winner}</h1>
                <br/>
                <h2>{secondplace}</h2>
                <br/>
                <h3>{thirdplace}</h3>
            </CenterText>
        )
    }
}

Results.propTypes = {
    teams: PropTypes.array.isRequired
};

export default Results;