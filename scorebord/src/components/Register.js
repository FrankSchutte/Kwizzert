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
            </div>
        )
    }
}

Register.propTypes = {
    onRegister: PropTypes.func.isRequired
};

export default Register;