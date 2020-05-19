import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import './show.css';
import { teamNames1, teamNames2 } from './team_names';
import $ from 'jquery';
import ShowMap from '../map/show_map';


class GameShow extends React.Component {
    constructor(props) {
        super(props);
        this.addPlayer = this.addPlayer.bind(this)
        this.removePlayer = this.removePlayer.bind(this)
        this.endGame = this.endGame.bind(this)
        this.startGame = this.startGame.bind(this)
        this.state = {id: this.props.match.params.gameId, game: {}, 
        players: {}, count: {}, fileUrl: '' };
        this.state.count[this.state.id] = 0;
        this.state.players[this.state.id] = [[], []];
        // this.teamKey = `${this.state.id}teamNames`;
        // this.state.game.teamNames[this.teamKey] = ['team 1', 'team2']
        this.firstTeam = '';
        this.secondTeam = '';
    }

    componentDidMount() {
        this.props.getGames();
        this.props.getGame(this.props.match.params.gameId);
        this.props.getUsers();
        this.props.getUser();
        

        let gameId = this.state.id;
        let teams = localStorage.getItem(`${this.state.id}`) ||
         this.state.players[gameId];
        let teamNames = localStorage.getItem(`${this.teamKey}`) || 
        this.state.teamNames;

        // if (typeof teamNames === "string") {
        //     this.state.teamNames[this.teamKey] = JSON.parse(teamNames);
        //     this.setState({ teamNames: this.state.teamNames })
        // } else {
        //     this.state.players[this.teamKey] = teamNames;
        //     this.setState({ players: this.state.teamNames })
        // }

        // if (typeof teams === "string"){ 
        //     this.state.players[this.state.id] = JSON.parse(teams);
        //     this.setState({ players: this.state.players})
        // } else {
        //     this.state.players[this.state.id] = teams;
        //     this.setState({ players: this.state.players})
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
            if (this.state.game.game_set != undefined) {
                this.state.game.game_set = true;
                this.setState({ game: this.state.game })
                this.props.updateGame(this.state.game);
            }

            // $(".grid").addClass("grid-b");
            // $(".showbox-right").addClass("showbox-right-b");
            // $(".showbox-right").removeClass("showbox-right");
            // $(".team1").addClass("team1-b");
            // $(".vs").addClass("vs-b");
            // $(".team2").addClass("team2-b");

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
            // let teams = [team1, team2];
            
            this.state.game.teams = [team1, team2];
            this.setState({ game: this.state.game })


            this.firstTeam = teamNames1[Math.floor(Math.random() * 
                teamNames1.length)];
               
          
            this.secondTeam = teamNames2[Math.floor(Math.random() * 
                teamNames2.length)];
            this.state.game.teamNames = [this.firstTeam, 
                this.secondTeam];

            this.props.updateGame(this.state.game)   
                .then(() => this.props.history.push(`/setgames/${this.state.id}`))
            
            
        }
    }

    openSpots() {
      let gameSize = this.state.game.players.length;
        if (gameSize < 9){
            return(
                <div id="open-spots">
                    {`${10 - gameSize} more spots to be filled.`}
                </div>
            )
        } else if (gameSize === 9) {
           return (
                <div id="open-spots">
                {`${10 - gameSize} more spot to be filled.`}
            </div>
           )
        } else {
            return(
                <div id="open-spots">
                    You may select teams!
                </div>
            )
        }
    }

    endGame(e) {
        e.preventDefault();
        if (this.props.player.id == this.state.game.players[0]._id) {
            this.props.removeGame(this.state.game._id)
                .then(() => this.props.history.push('/'));
        }     
    }

    activeButtons() {
        let startGray = "gray-out";
        if (this.state.game.players.length === 10) startGray = "";
        if ((this.props.player !== undefined) && 
        (this.props.player.id === this.state.game.players[0]._id)){
        return (
            <div className="buttons">
                <button className="add-player player-button"
                    onClick={this.addPlayer}>Join This Game</button>
                <button className="gray-out"
                    >Leave This Game</button>
                <button className={startGray}
                    onClick={this.startGame}>Select Teams</button>
                <button className="cancel-game"
                    onClick={this.endGame}>Cancel Game</button>
            </div>)
        } else {
            return (
                <div className="buttons">
                    <button className="add-player player-button"
                        onClick={this.addPlayer}>Join This Game</button>
                    <button className="remove-player player-button"
                        onClick={this.removePlayer}>Leave This Game</button>
                    <button className={startGray}
                        onClick={this.startGame}>Select Teams</button>
                    <button className="gray-out"
                        >Cancel Game</button>
                </div>)
        }

    }


    render() {
        
        let game = {players: []};
       
        this.props.games.forEach(g => {
            
            if (g._id === this.state.id) {
                game = g
                this.state.game = game;
            }
        });
        if (!Object.keys(this.state.game).length) return (<div></div>)
        return (

            <div className="show">

                <div className="flex-vid">
                    <div className="video-box">
                        <video id="pickup-vid" playsInline autoPlay loop muted>
                            <source src='https://ballup-dev.s3-us-west-1.amazonaws.com/pickupBball2.mp4' type="video/mp4" />
                        </video>
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
                                        <ShowMap 
                                          game={game} 
                                          history={this.props.history}
                                          />
                                    </div>
                                </div>
                            </div>

                            <div className="showbox-right">
                              <div className="grid-length">
                                <div className="grid">
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
                                </div>
                            </div>

                                <div className="team1">
                                    <h1>Game Set</h1>
                                </div>
                                <div id="os-flex">
                                    {this.openSpots()}
                                </div>
                            </div>
                        </div>
                        {this.activeButtons()}
                    </div>
                </div>
                <div id="divider"></div>
                <div id="color">
                        <div id="color-left">
                            <p id="copyright" >BallUp © 2020</p>
                            <img src="left-court.png"/>
                        </div>
                        <div id="color-right">
                            <img src="right-court.png" />
                        </div>
                </div>
            </div>
        )
    }

}

export default GameShow;
