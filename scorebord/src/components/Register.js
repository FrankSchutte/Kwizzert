import React, {Component, PropTypes} from 'react';
import CenterText from './styling/CenterText';

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
        this.props.onRegister(e.target.code.value);
    };

    render() {
        return (
            <CenterText>
                <h1>Registreer voor de Kwiz</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        Code
                        <input type="text" id="code"/>
                    </div>
                    <br/>
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