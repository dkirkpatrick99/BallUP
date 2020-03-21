import '../nav/navbar.css'
import React from 'react';

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
                <ul className="tag-list">
                    <li><h1 id="tag">Dope tagline promoting our product</h1></li>
                    <li><p id="sub-tag">Cool stuff describing why folks should join BallUP, and how clicking the button below will change their lives.</p></li>
                </ul>
                <button className="signup-btn">Get Started</button>
            </div>
            </div>
        )
    }

}

export default Splash;