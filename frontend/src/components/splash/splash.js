import '../nav/navbar.css'
import React from 'react';
import LoginContainer from '../session/login_form_container'

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div>
            <div className="hero">
            </div>
            <div className="tag-container">
                    {/* <div className="modal-background">
                        <LoginContainer />
                    </div> */}
                <ul className="tag-list">
                    <li><h1 id="tag">Dope tagline promoting our product</h1></li>
                    <li><p id="sub-tag">Cool stuff describing why folks should join BallUP, and how clicking the button below will change their lives.</p></li>
                </ul>
                <button className="signup-btn">Got Next?</button>
            </div>
            </div>
        )
    }

}

export default Splash;