 import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";
import IndexMap from "../map/index_map"
import $ from 'jquery';
import niceScroll from 'jquery'
import './index.css';
import IndexMapContainer from "../map/index_map_container";
import { Scrollbars } from 'react-custom-scrollbars';


class Courts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            hr: '',
            min: '',
            ampm: '',
            time: '',
            game_date: '',
            game_set: false,
            teams:[],
            teamNames: []
        };
        this.handleSumbit= this.handleSumbit.bind(this);
        this.createGameModal= this.createGameModal.bind(this);
        

    }

    componentDidMount(){
    
        this.props.getGames();
        // this.props.getAddress('1109 N Highland St, Arlington VA');
        $('.navbar').removeClass('navbar-b');
    }

    handleSumbit() {
        
        this.state.time = `${this.state.hr}${this.state.min} ${this.state.ampm}`;
        this.state.location = `${this.state.location} San Francisco, CA`
       
        let game = {
            
            title: this.state.title,
            location: this.state.location,
            time: this.state.time,
            game_date: this.state.game_date,
            players: [],
            game_set: false,
            teams: [],
            teamNames: []
        };


        this.props.createGame(game)
            .then(() => this.props.history.push('/'));
    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    createGameModal(e) {
        e.preventDefault();
        $(".new-game").addClass("new-game-b");
    }

    closeModal(e) {
        e.preventDefault();
        $(".new-game").removeClass("new-game-b");
    }

    render() {

       let set_games = this.props.games.filter( game =>
            game.game_set
        )

       let unset_games = this.props.games.filter( game =>
            game.game_set !== true
        )
        let set_game_i = 1;
        let unset_game_i = 1;
        return (
            <div>
                <div className="index">

                    <div className="top">
                        
                        <div className="games">
                            <h2 id="list-head">Open Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                            </h2>
                        <div className="game-list">
                            {unset_games.map( game => 
                                <div className="game-list-item">
                                    <ul className={game._id}><div className="num-circle">
                                        {unset_game_i}</div>
                                        <div className="hide-me">
                                            {unset_game_i++}</div>
                                        <Link to={`/games/${game._id}`}>
                                            <GameItem game={game} />
                                        </Link>
                                    </ul>
                                    
                                </div> 
                                )}
                                <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                            </h2>
                            </div>
                        </div>

                        <div className="games">
                            <h2 id="list-head">Set Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;</h2>
                                <div className="set-game-list">
                                    {set_games.map(game =>
                                        <div className="game-list-item">
                                            <ul className={game._id}><div className="num-circle-set">
                                                {set_game_i}</div>
                                                <div className="hide-me">
                                                    {set_game_i++}</div>
                                                <Link to={`/setgames/${game._id}`}>
                                                    <GameItem game={game} />
                                                </Link>

                                            </ul>
                                        </div>
                                    )}
                                    <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                                </h2>
                                </div>
                        </div>
                        
                        <div className="map">
                            <IndexMapContainer 
                            history={this.props.history}
                            />
                        </div>
                    </div>

                    <div className="new-game">
                    <p className="ng-closeout" onClick={this.closeModal}>&times;</p>
                    <h1>Create a New Game</h1>
                        <form onSubmit={ (e) => {
                            e.preventDefault();
                            this.handleSumbit()
                        }}>
                            <input type="text"
                                value={this.state.title}
                                onChange={this.update('title')}
                                placeholder="Title"
                            />
                            <input type="text"
                                value={this.state.location}
                                onChange={this.update('location')}
                                placeholder="Street Address"
                            />

                            <div id="city-div">
                                <label id="city">San Francisco, California</label>
                            </div>
                            <div className="time-line">
                            <select name={this.state.time} 
                                onChange={this.update('hr')}>
                                <option selected disabled>Hr</option>
                                <option value="1:">1:</option>
                                <option value="2:">2:</option>
                                <option value="3:">3:</option>
                                <option value="4:">4:</option>
                                <option value="5:">5:</option>
                                <option value="6:">6:</option>
                                <option value="7:">7:</option>
                                <option value="8:">8:</option>
                                <option value="9:">9:</option>
                                <option value="10:">10:</option>
                                <option value="11:">11:</option>
                                <option value="12:">12:</option>
                            </select>
                        
                                <select name={this.state.time} 
                                    onChange={this.update('min')}>
                                    <option selected disabled>Min</option>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                            
                            <select name={this.state.time} onChange={this.update('ampm')} >
                                <option selected disabled>AM/PM</option>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                            </div>
                            <input type="date" name="Game Date" 
                                value={this.state.game_date}
                                onChange={this.update('game_date')}
                                min="2020-01-01" max="2025-12-31">
                            </input>
                            <input type="hidden"
                                value={this.state.game_set}
                                onSubmit={this.update('game_set')}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <p className="ng-btn" onClick={this.createGameModal}>
                        New Game</p> 
                </div>
                <div id="divider">
                    <p id="copyright">BallUp © 2020</p>
                </div>
                {/* <div id="color">
                        <div id="color-left">
                            <img src="left-court.png"/>
                        </div>
                        <div id="color-right">
                            <img src="right-court.png" />
                        </div>
                </div> */}
            </div>
             
        
        )}
}


export default Courts;
