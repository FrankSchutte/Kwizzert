import React, {Component, PropTypes} from 'react';

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
            <div>
                <h1>Registreer voor de Kwiz</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        Code
                        <input type="text" id="code"/>
                    </div>
                    <input type="submit" value="Registreer"/>
                </form>
                {this.props.quiz_found === false ?
                    <p>Aanmelden bij quiz mislukt{this.state.exclamation}</p> : ''
                }
            </div>
        )
    }
}

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
    quiz_found: PropTypes.bool.isRequired
};

export default Register;