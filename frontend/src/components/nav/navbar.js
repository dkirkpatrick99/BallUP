import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import $ from 'jquery';
import LoginContainer from '../session/login_form_container'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.loginModal = this.loginModal.bind(this);
        this.signupModal = this.signupModal.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    loginModal(e) {
        e.preventDefault();
        $('.modal-background-closed').addClass('modal-background');
        $('.modal-background-closed').removeClass('modal-background-closed');
    }

    signupModal(e) {
        e.preventDefault();
        $('.su-modal-background-closed').addClass('su-modal-background');
        $('.su-modal-background-closed').removeClass('su-modal-background-closed');
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/courts'}>All Courts</Link>
                    {/* <Link to={'/profile'}>Profile</Link> */}
                    {/* <Link to={'/new_tweet'}>Write a Tweet</Link> */}
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <ul className="navbar-right">
                    <li onClick={this.signupModal}>Signup</li>
                    <li onClick={this.loginModal}>Login</li> 
                </ul>
            );
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-left">
                    <img className="nav-shoes" src="shoes512.png"
                        alt="shoes"
                    />
                    <h1 className="splash-logo">BallUP</h1>
                </div>
                    {this.getLinks()}
                        {/* <div className="hero">
                        </div>
                        <div className="tag-container">
                            <ul className="tag-list">
                        <li><h1 id="tag">Dope tagline promoting our product</h1></li>
                        <li><p id="sub-tag">Cool stuff describing why folks should join BallUP, and how clicking the button below will change their lives.</p></li> 
                            </ul>
                          <button className="signup-btn">Get Started</button>
                        </div> */}
            </div>
        );
    }
}

export default NavBar;