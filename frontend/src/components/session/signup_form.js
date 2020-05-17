import React from 'react';
import { withRouter } from 'react-router-dom';
import "./signup_form.css"


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            handle: '',
            password: '',
            password2: '',
            first: '',
            second: '',
            third: ''
            // errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/games');
        }

        // this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            password2: this.state.password2,
            first: this.state.first,
            second: this.state.second,
            third: this.state.third
        };

        this.props.signup(user)
        .then(() => this.props.login({email: user.email, 
            password: user.password }))
    }

    // renderErrors() {
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, i) => (
    //                 <li key={`error-${i}`}>
    //                     {/* {this.state.errors[error]} */}
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // }
    

    render() {
      
        let postions = ["Point Guard", "Shooting Guard", "Small Forward",
            "Power Forward", "Center"];
        let secondaryPos = postions.filter( position =>
            position !== this.state.first
            )
        let tertiaryPos = postions.filter ( position =>
            position !== this.state.first && position !== this.state.second
            )
        return (
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="signup-form">
                        <br />
                        <div className="flex-div">
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className="sign-email"
                        />
                        {/* <br /> */}
                        <input type="text"
                            value={this.state.handle}
                            onChange={this.update('handle')}
                            placeholder="Username"
                            className="sign-user"
                        />
                        </div>
                        <br/>
                        <p className="please-select">Select your favorite positions:</p>
                        <div className="flex-div">
                            <select onChange={this.update('first')} className="three-options">
                            <option value="none" selected disabled hidden>
                                1st Choice
                            </option>
                            { postions.map( position => 
                                <option value={position}
                                key={""}
                                >{position}</option>
                            )}
                        </select>
                        {/* <br /> */}
                            <select onChange={this.update('second')} className="three-options">
                            <option value="none" selected disabled hidden>
                                2nd Choice
                            </option>
                            {secondaryPos.map(position =>
                                <option value={position}
                                >{position}</option>
                            )}
                        </select>
                        {/* <br/> */}
                        <select onChange={this.update('third')} className="three-options">
                            <option value="none" selected disabled hidden>
                                3rd Choice
                            </option>
                            {tertiaryPos.map(position =>
                                <option value={position}
                                >{position}</option>
                            )}
                        </select>
                        </div>
                        <br />
                        <div className="flex-div">
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="signup-pass1"
                        />
                        {/* <br /> */}
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                            className="signup-pass2"
                        />
                        </div>
                        <br />
                        {/* <input type="submit" value="Submit" /> */}
                        <button className="su-btn">Submit</button>
                        {/* {this.renderErrors()} */}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);