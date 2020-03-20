import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
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
                    <li><Link className='link' to={'/signup'}>Signup</Link></li>
                    <li><Link className='link' to={'/login'}>Login</Link></li> 
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
                <button className="signup-btn">Get Started</button>
                    {this.getLinks()}
                        <div className="hero">
                        </div>
                   </div>
        );
    }
}

export default NavBar;