import React, {Component, PropTypes} from 'react';
import CenterText from './styling/CenterText';
import Box from './styling/Box';

class Quiz extends Component {
    render() {
        const quizInfo =
            <CenterText>
                <p>Vraag: {this.props.questionNum} Ronde: {this.props.roundNum}</p>
            </CenterText>;

        const teamInfo = this.props.teams.map((team) =>
            <Box key={team.teamName}>
                <p>Team naam: {team.teamName}<br/>
                   Punten in deze ronde: {team.roundScore}<br/>
                   Totale rondepunten: {team.totalScore}<br/>
                </p>
            </Box>
        );

        let question;
        if (this.props.question && this.props.status !== 'invisible') {
            question =
                <CenterText>
                    <div>
                        <p>{this.props.question.category}</p>
                    </div>
                    <div>
                        <p>{this.props.question.question}</p>
                    </div>
                        {this.props.status === 'answer' ?
                            <p>{this.props.question.answer}</p>
                            : ''
                        }
                </CenterText>
        } else question = '';

        let results;
        if (this.props.results && this.props.status !== 'invisible') {
            results = this.props.results.map((result) => {
                let rating;
                if (result.approved === null) {
                    rating = 'rating_none';
                } else if (result.approved) {
                    rating = 'rating_good';
                } else
                    rating = 'rating_bad';

                return (
                    <Box key={result.teamName + '1'} rating={rating}>
                        <p>Team: {result.teamName}</p>
                        {this.props.status === 'answer' ?
                            <div>
                                <p>Antwoord: {result.answer}</p>
                            </div>
                            : ''
                        }
                    </Box>
                );
            }

            )
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