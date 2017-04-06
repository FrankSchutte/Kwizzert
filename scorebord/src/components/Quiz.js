import React, {Component, PropTypes} from 'react';

class Quiz extends Component {
    render() {
        const quizInfo =
            <div>
                <p>Vraag: {this.props.questionNum} Ronde: {this.props.roundNum}</p>
            </div>;

        const teamInfo = this.props.teams.map((team) =>
            <div key={team.teamName}>
                <ul>
                    <li>Team naam: {team.teamName}</li>
                    <li>Punten in deze ronde: {team.roundScore}</li>
                    <li>Totale rondepunten: {team.totalScore}</li>
                </ul>
            </div>
        );

        let question;
        if (this.props.question && this.props.status !== 'invisible') {
            question =
                <div>
                    <div>
                        {this.props.question.category}
                    </div>
                    <div>
                        {this.props.question.question}
                    </div>
                        {this.props.status === 'answer' ?
                            <div>
                                {this.props.question.answer}
                            </div>
                            : ''
                        }
                </div>
        } else question = '';

        let results;
        if (this.props.results && this.props.status !== 'invisible') {
            results = this.props.results.map((result) =>
                <div key={result.teamName + '1'}>
                    <br/>
                    {result.teamName}
                    <br/>
                    {result.answer}
                    <br/>
                    {result.approved ? 'Goed' : 'Fout'}
                </div>
            );
        } else results = '';

        return (
            <div>
                <div>{quizInfo}</div>
                <div>{teamInfo}</div>
                <hr/>
                <div>{question}</div>
                <div>{results}</div>
            </div>
    )};
}

Quiz.propTypes = {
    teams: PropTypes.array.isRequired,
    question: PropTypes.object,
    status: PropTypes.string.isRequired,
    results: PropTypes.array,
    questionNum: PropTypes.number.isRequired,
    roundNum: PropTypes.number.isRequired
};

export default Quiz;