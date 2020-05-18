import React from 'react';
import { withRouter } from 'react-router-dom';
import './login_form.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoUser = this.demoUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.currentUser === true) {
            this.props.history.push('/games'); //navigate to games index
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    demoUser() {
        let user = {
            email: 'guest@guest.com',
            password: '123456'
        };
        this.setState({email: user.email});
        this.setState({password: user.password});
        this.props.login(user);
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({ email: user.email });
        this.setState({ password: user.password });

        this.props.login(user);
    }



    renderErrors() {

        if (this.state.errors === undefined) return (<ul ></ul>);

        let emailE = [];
        let passwordE = [];

        emailE.push(Object.values(this.state.errors).filter((error) => (
            error.includes("email") || error.includes("Email") || error.includes("user")
        )));
            
        passwordE.push(Object.values(this.state.errors).filter((error) => (
            error.includes("password") || error.includes("Password")
        )));

        
        if ((emailE[0].length && passwordE[0].length) || 
            (emailE[0].length && !passwordE[0].length)){
        return (
            <ul id="li-errors">
                {emailE.map( (email, i) => 
                    <li id="email-e" key={i}>{email}</li>  
                )}
                {passwordE.map( (password, i) => 
                    <li id="password-e" key={i}>{password}</li>  
                )}
            </ul>
                );
        } else if (!emailE[0].length && passwordE[0].length) {
           return (
                <ul id="li-errors">
                    {passwordE.map((password, i) =>
                        <li id="password-e-b" key={i}>{password}</li>
                    )}
                </ul>
            )
        }
    }

    render() {
            
        return (
            <div id="login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                        {/* <br /> */}
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <button>Submit</button>
                        <br/>
                        <button className="demo" onClick={this.demoUser}>Demo User</button>
                </form>
                    {this.renderErrors()}
                
            </div>
        );
    }
}

export default withRouter(LoginForm);