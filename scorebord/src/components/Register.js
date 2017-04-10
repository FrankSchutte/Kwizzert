import React, {Component, PropTypes} from 'react';

class Register extends Component {

    onSubmit = (e) => {
        e.preventDefault();
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
                    <p>Aanmelden bij quiz mislukt!</p> : ''
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