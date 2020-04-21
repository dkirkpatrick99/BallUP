import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import MapContain from '../map/geocoding'
import './show.css';
import { teamNames1, teamNames2 } from './team_names'
import ShowMap from '../map/show_map'
import $ from 'jquery'


class SetGameShow extends React.Component {
    constructor(props) {
        super(props);
        this.addPlayer = this.addPlayer.bind(this)
        this.removePlayer = this.removePlayer.bind(this)
        this.endGame = this.endGame.bind(this)
        this.startGame = this.startGame.bind(this)
        this.state = {id: this.props.match.params.gameId, game: {}, 
        players: {}, count: {}, teamNames: {} };
        this.state.count[this.state.id] = 0;
        this.state.players[this.state.id] = [[], []];
        this.teamKey = `${this.state.id}teamNames`;
        this.state.teamNames[this.teamKey] = ['team 1', 'team2']
        this.firstTeam = '';
        this.secondTeam = '';
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {
        this.props.getGames();
        this.props.getGame(this.props.match.params.gameId);
        this.props.getUsers();
        this.props.getUser();
        // localStorage.removeItem(`${this.state.id}`);
        

        let gameId = this.state.id;
        // let currCount = localStorage.getItem(`${this.state.id}`) || this.state.count[gameId];
        let teams = localStorage.getItem(`${this.state.id}`) ||
         this.state.players[gameId];
        let teamNames = localStorage.getItem(`${this.teamKey}`) || 
        this.state.teamNames;

        if (typeof teamNames === "string") {
            this.state.teamNames[this.teamKey] = JSON.parse(teamNames);
            this.setState({ teamNames: this.state.teamNames })
        } else {
            this.state.players[this.teamKey] = teamNames;
            this.setState({ players: this.state.teamNames })
        }

        if (typeof teams === "string"){ 
            this.state.players[this.state.id] = JSON.parse(teams);
            this.setState({ players: this.state.players})
        } else {
            this.state.players[this.state.id] = teams;
            this.setState({ players: this.state.players})
        }
        // if (typeof currCount === "string"){ 
        //     this.state.count[this.state.id] = JSON.parse(currCount);
        //     this.setState({ count: this.state.count})
        // } else {
        //     this.state.count[this.state.id] = currCount;
        //     this.setState({ count: this.state.count})
        // }
    }

    addPlayer(e) {
        e.preventDefault();
        
        let exists = false;

        this.state.game.players.forEach( player => {
            if (player.id === this.props.player.id || 
                player._id === this.props.player.id) {
                    exists = true;
                }
        })
        if (exists === false){
         this.state.game.players.push(this.props.player);
         this.props.updateGame(this.state.game);
        }
        
    }

    removePlayer(e) {
        e.preventDefault();
        let newPlayers = [];
        this.state.game.players.forEach(player => {
            if (player.id !== this.props.player.id) {
                newPlayers.push(player)
            }
        });
        this.state.game.players = newPlayers;
        this.props.updateGame(this.state.game);
    };

    startGame(e) {
     e.preventDefault();
        if (this.state.game.players.length === 10) {
            $(".grid").addClass("grid-b");
            $(".showbox-right").addClass("showbox-right-b");
            $(".showbox-right").removeClass("showbox-right");
            $(".team1").addClass("team1-b");
            $(".vs").addClass("vs-b");
            $(".team2").addClass("team2-b");

            let team1 = {
                "Point Guard": 0, "Shooting Guard": 0, "Small Forward": 0, 
                "Power Forward": 0, "Center": 0};

            let team2 = {"Point Guard": 0, "Shooting Guard": 0,  
                "Small Forward": 0, "Power Forward": 0, "Center": 0};

            let mid = Math.floor(this.state.game.players.length / 2);
            
            let playersArr1 = this.state.game.players.slice(0, mid);
            let playersArr2 = this.state.game.players.slice(mid);
            
            let positions = ["Point Guard", "Shooting Guard", "Small Forward", 
            "Power Forward", "Center"];

            
            playersArr1.forEach((player) => {
                if (team1[player.first] === 0) {
                    team1[player.first] = player.handle
                } else if (team2[player.first] === 0) {
                    team2[player.first] = player.handle
                } else if (team1[player.second] === 0) {
                    team1[player.second] = player.handle 
                } else if (team2[player.second] === 0) {
                    team2[player.second] = player.handle 
                }
                else if (team1[player.third] === 0) {
                    team1[player.third] = player.handle 
                } else {
                    for (let i = 0; i < positions.length; i ++){
                        if (team1[positions[i]] === 0){
                            team1[positions[i]] = player.handle
                            break;
                        } else if (team2[positions[i]] === 0) {
                            team2[positions[i]] = player.handle
                            break;
                        }
                    }
                }
            })

            playersArr2.forEach((player) => {
                if (team2[player.first] === 0) {
                    team2[player.first] = player.handle
                } else if (team1[player.first] === 0) {
                    team1[player.first] = player.handle
                } else if (team2[player.second] === 0) {
                    team2[player.second] = player.handle 
                } else if (team1[player.second] === 0) {
                    team1[player.second] = player.handle
                } else if (team2[player.third] === 0) {
                    team2[player.third] = player.handle 
                } else {
                    for (let i = 0; i < positions.length; i++) {
                        if (team2[positions[i]] === 0) {
                            team2[positions[i]] = player.handle
                            break;
                        } else if (team1[positions[i]] === 0) {
                            team1[positions[i]] = player.handle
                            break;
                        }
                    }
                }
            })
            let teams = [team1, team2];
            this.firstTeam = teamNames1[Math.floor(Math.random() * 
                teamNames1.length)];
          
            this.secondTeam = teamNames2[Math.floor(Math.random() * 
                teamNames2.length)];
            this.state.teamNames[this.teamKey] = [this.firstTeam, 
                this.secondTeam];
            localStorage.setItem(`${this.teamKey}`, 
            JSON.stringify(this.state.teamNames[this.teamKey]))
            this.state.players[this.state.id] = teams;
            localStorage.setItem(`${this.state.id}`, 
            JSON.stringify(this.state.players[this.state.id]))
            this.setState({ [this.state.id]: this.state.count[this.state.id] })
        }
    }

    endGame(e) {
        e.preventDefault();
        if (this.props.player.id == this.state.game.players[0]._id) {
            this.props.removeGame(this.state.game._id)
                .then(() => this.props.history.push('/'));
        }
        
        
    }

    increment (e) {
        e.preventDefault();
        // const { count } = this.state;
        this.state.count[this.state.id]++;
        // localStorage.setItem(`${this.state.id}`, JSON.stringify(this.state.count[[this.state.id]]))
        // this.setState({ [this.state.id]: this.state.count[this.state.id]})
        // this.state.count++;
        // this.props.updateGame(this.state.count);
    }

    render() {
        
        let game = {players: []};
       
        this.props.games.forEach(g => {
            
            if (g._id === this.state.id) {
                game = g
                this.state.game = game;
            }
        });

    // if (game.players.length === 10) {
    //     document.getElementsByClassName("add-player").style.display = "none";
    //     document.getElementsByClassName("full-game").style.display = "block";
    //     document.getElementsByClassName("owner-button").style.display = "none";
    // } 
    
    // if (game.players.includes(this.props.player)){
    //     document.getElementsByClassName("add-player").style.display = "none";
    //     document.getElementsByClassName("remove-player").style.display = "block";
    // }

    // if (game.players.first === this.props.player) {
    //     document.getElementsByClassName("add-player").style.display = "none";
    //     document.getElementsByClassName("remove-player").style.display = "none";
    //     document.getElementsByClassName("owner-button").style.display = "block";
    // } else {
    //     document.getElementsByClassName("owner-button").style.display = "none";
    // }


        return (

            <div className="show">

                <div className="flex-vid">
                    <div className="video-box">
                        <video id="pickup-vid" autoPlay loop muted>
                            <source src="pickupBball2.mp4" type="video/mp4" />
                        </video>
                        {/* <div className="vid-objects">
                            <div className="game-info">
                                <h2>{game.title}</h2>
                                <h2>{game.location}</h2>
                                <h2>{game.time}</h2>
                                <h2>{game.game_date}</h2>
                            </div>
                            <div className="players">
                                <ul id="player-names">
                                    <h2>Players</h2>
                                    {
                                        game.players.map((player) => 
                                        <GameShowPlayer player={player} />)
                                    }
                                </ul>

                            </div>
                    </div> */}
                    </div>
                    <div className="middle-content">
                        <div className="showbox">
                            <div className="showbox-left">
                                <div className="showbox-left-top">
                                    <div className="game-info">
                                        <h2>{game.title}</h2>
                                        <h2>{game.location}</h2>
                                        <h2>{game.time}</h2>
                                        <h2>{game.game_date}</h2>
                                    </div>
                                </div>
                                <div className="showbox-left-bottom">
                                    <div className="show-map">
                                        <ShowMap game={game} />
                                    </div>
                                </div>
                            </div>

                            <div className="showbox-right">
                                {/* <div className="grid">
                                    <div id="playes"><div>
                                        <div id="p-title">Players</div></div>
                                        {game.players.map((player) =>
                                            <div > <div id="player">
                                                @<GameShowPlayer
                                                player={player} /></div>
                                            </div>
                                        )}
                                    </div>
                                    <div><div><div id="r-title">Rating
                                    </div></div>
                                        {game.players.map((player) =>
                                            <div ><div id="rating"><img id="ball"
                                                src="ball.png" alt="" /><div 
                                                id="r-num">4.5</div></div>
                                            </div>
                                        )}
                                    </div>
                                </div> */}

                                <div className="team1-b">
                                    <ul>
                                        <h1>
                                        {this.state.teamNames[this.teamKey][0]}
                                        </h1>
                                        {
                                        Object.keys(
                                            this.state.players[this.state.id][0]).map(position =>
                                            <li>{position} | @
                                            {this.state.players[this.state.id][0][position]}
                                            </li>)
                                        }
                                    </ul>
                                </div>
                                <div className="vs-b">VS.</div>
                                <div className="team2-b">
                                    <ul>
                                        <h1>{this.state.teamNames[this.teamKey][1]}</h1>
                                        {
                                            Object.keys(
                                                this.state.players[this.state.id][1]).map(position =>
                                                    <li>{position} | @
                                            {this.state.players[this.state.id][1][position]}
                                                
                                                    </li>)
                                        }
                                    </ul>
                                </div>
                                {/* <div>
                                <h1>{this.firstTeam}</h1>
                                <ul>
                                    {
                                        Object.keys(this.state.players[0]).map(position =>
                                            <li>{this.state.players[0][position]} {position}</li>)
                                    }
                                </ul>
                                <h1>{this.secondTeam}</h1>
                                <ul>
                                    {
                                        Object.keys(this.state.players[1]).map(position =>
                                            <li>{this.state.players[1][position]} {position}</li>)
                                    }
                                </ul>
                                </div> */}
                            </div>
                        </div>
                        <div className="buttons">                           
                                    {/* <button className="full-game">This Game Is Full!</button> */}
                                <button className="add-player player-button"
                                    onClick={this.addPlayer}>Join This Game</button>
                                <button className="remove-player player-button"
                                    onClick={this.removePlayer}>Leave This Game</button>
                                <button className="owner-button start-game"
                                    onClick={this.startGame}>Select Teams</button>
                                <button className="owner-button cancel-game"
                                    onClick={this.endGame}>Cancel Game</button>
                        </div>
                    </div>
                </div>
              
                {/* <h1>{this.props.games.length}</h1> */}
                {/* <h1>This is how many people are on each team {this.state.players.length}</h1> */}
                {/* <div>
                        <p>You clicked {this.state.count[this.state.id]} times</p>
                        <button id="boo" onClick={this.increment}>
                            Click me
                        </button>
                </div> */}

                    <div >
                        <MapContain />
                    </div>
            </div>
        )
    }

}

export default SetGameShow
