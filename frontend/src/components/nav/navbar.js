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
        $('.su-modal-background').addClass('su-modal-background-closed');
        $('.su-modal-background').removeClass('su-modal-background');

        $('.navbar').addClass('navbar-b');
        $('.hero').addClass('hero-b');
        $('.tag').addClass('tag-b');
        $('.sub-tag').addClass('sub-tag-b');
        $('.signup-btn').addClass('signup-btn-b');
        
    }

    signupModal(e) {
        e.preventDefault();
        $('.su-modal-background-closed').addClass('su-modal-background');
        $('.su-modal-background-closed').removeClass('su-modal-background-closed');
        $('.modal-background').addClass('modal-background-closed');
        $('.modal-background').removeClass('modal-background');

        $('.navbar').addClass('navbar-b');
        $('.hero').addClass('hero-b');
        $('.tag').addClass('tag-b');
        $('.sub-tag').addClass('sub-tag-b');
        $('.signup-btn').addClass('signup-btn-b');
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <ul className="navbar-right-loggedin">
                    <li><Link to={'/games'}>Games</Link></li>
                        <li onClick={this.logoutUser}>Logout</li> 
                    </ul>
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

    activeLogo() {
        if (this.props.loggedIn) {
        return (
            <div className="navbar-left">
                <Link to="/games"><img className="nav-shoes" 
                src="shoes512.png" alt="shoes" /></Link>
                <Link to="/games"><img className="splash-logo" 
                src="bu_logo.png" /></Link>
            </div>
        )
        } else {
            return (
                
                <div className="navbar-left">
                    <img className="nav-shoes" src="shoes512.png" alt="shoes" />
                    <img className="splash-logo" src="bu_logo.png" />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="navbar">
                    {this.activeLogo()}
                    {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;