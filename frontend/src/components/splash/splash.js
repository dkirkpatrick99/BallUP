import '../nav/navbar.css'
import React from 'react';
import LoginContainer from '../session/login_form_container';
import SignupContainer from '../session/signup_form_container';
import $ from 'jquery';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }


    signupModal(e) {
        e.preventDefault();
        $('.su-modal-background-closed').addClass('su-modal-background');
        $('.su-modal-background-closed').removeClass('su-modal-background-closed');
    }

    render(){

        return (
            <div>
            <div className="hero">
            </div>
            <div className="tag-container">
                    <div className="modal-background-closed">
                        <LoginContainer />
                    </div>
                    <div className="su-modal-background-closed">
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