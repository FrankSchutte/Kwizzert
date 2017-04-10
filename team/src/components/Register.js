import React, {Component, PropTypes} from 'react';

import CenterText from './styling/CenterText';
import InputField from './styling/InputField';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exclamation: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({exclamation: this.state.exclamation + '!'});
        this.props.onRegister(e.target.teamName.value, e.target.code.value);
    };

    render() {
        return (
            <CenterText>
                <h1>Registreer voor een Kwiz</h1>
                <form onSubmit={this.onSubmit}>
                    <InputField id="teamName" label="Team naam"/>
                    <InputField id="code" label="Kwiz code"/>
                    <input type="submit" value="Registreer"/>
                </form>
                {this.props.quiz_found === false ?
                    <p>Aanmelden bij quiz mislukt{this.state.exclamation}</p> : ''
                }
            </CenterText>
        )
    }
}

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
    quiz_found: PropTypes.bool
};

export default Register;
