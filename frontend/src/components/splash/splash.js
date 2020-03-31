import '../nav/navbar.css'
import React from 'react';
import LoginContainer from '../session/login_form_container';
import SignupContainer from '../session/signup_form_container';
import $ from 'jquery';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    ModalClose(e) {
        e.preventDefault();
        $('.modal-background').addClass('modal-background-closed');
        $('.modal-background').removeClass('modal-background');
    }
    signupModalClose(e) {
        e.preventDefault();
        $('.su-modal-background').addClass('su-modal-background-closed');
        $('.su-modal-background').removeClass('su-modal-background');
    }

    render(){

        return (
            <div>
            <div className="hero">
            </div>
            <div className="tag-container">
                    <div className="modal-background-closed">
                        <p className="close-modal"
                            onClick={this.ModalClose}
                        >&times;</p>
                        <h1>Login</h1>
                        <LoginContainer />
                    </div>
                    <div className="su-modal-background-closed">
                        <p className="close-su-modal"
                            onClick={this.signupModalClose}
                        >&times;</p>
                        <h1>Signup</h1>
                        <SignupContainer />
                    </div>
                <ul className="tag-list">
                    <li><h1 id="tag">Dope tagline promoting our product</h1></li>
                    <li><p id="sub-tag">Cool stuff describing why folks should join BallUP, and how clicking the button below will change their lives.</p></li>
                </ul>
                    <button onClick={this.signupModal} className="signup-btn">Got Next?</button>
            </div>
            </div>
        )
    }

}

export default Splash;