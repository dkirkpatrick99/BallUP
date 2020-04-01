import React from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map'
import './show.css'

class GameShow extends React.Component {
    constructor(props) {
        super(props);
        this.addPlayer = this.addPlayer.bind(this)
        this.removePlayer = this.removePlayer.bind(this)
        this.endGame = this.endGame.bind(this)
        this.startGame = this.startGame.bind(this)
        this.state = {id: this.props.match.params.gameId, game: {}, players: [[], []]}
    }

    componentDidMount() {
        this.props.getGames()
        // this.props.getGame(this.props.match.params.gameId),
        this.props.getUsers()
        this.props.getUser()
    }

    addPlayer(e) {
        e.preventDefault();
        this.state.game.players.push(this.props.player);
        this.props.updateGame(this.state.game);
    }

    removePlayer(e) {
        e.preventDefault();
        let newPlayers = [];
        this.state.game.players.forEach(player => {
            if (player.id !== this.props.player.id) {
                newPlayers.push(player)
            }
        });
        this.state.game.players = newPlayers
        this.props.updateGame(this.state.game);
    };

    startGame(e) {
        e.preventDefault()
        let team1 = {"center":0, "point gaurd":0, "power forward":0, "small forward":0, "shooting gaurd":0};
        let team2 = {"center":0, "point gaurd":0, "power forward":0, "small forward":0, "shooting gaurd":0};
        let mid = Math.floor(this.state.game.players.length / 2);
        debugger;
        let playersArr1 = this.state.game.players.slice(0, mid);
        let playersArr2 = this.state.game.players.slice(mid);
        let positions = ["center", "point gaurd", "power forward", "small forward", "shooting gaurd"];
        
        playersArr1.forEach((player) => {
            if (team1[player.first] === 0) {
                team1[player.first] = player.handle
            } else if (team1[player.second] === 0) {
                team1[player.second] = player.handle 
            } else if (team1[player.third] === 0) {
                team1[player.third] = player.handle 
            } else {
                positions.forEach((position) => {
                    if (team1[position] === 0) {
                        team1[position] = player.handle
                    }
                })
            }
        })

        playersArr2.forEach((player) => {
            if (team2[player.first] === 0) {
                team2[player.first] = player.handle
            } else if (team2[player.second] === 0) {
                team2[player.second] = player.handle 
            } else if (team2[player.third] === 0) {
                team2[player.third] = player.handle 
            } else {
                positions.forEach((position) => {
                    if (team2[position] === 0) {
                        team2[position] = player.handle
                    }
                })
            }
        })
        let teams = [playersArr1, playersArr2];
        this.setState({players: teams})
    }

    endGame(e) {
        e.preventDefault();
        this.props.deleteGame(this.state.game);
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
                <h2>{game.location}</h2>
                <h2>{game.time}</h2>
                <h2>{game.date}</h2>
                <div>
                    
                    <div>
                        <button className="full-game">This Game Is Full!</button>
                        <button className="add-player player-button" onClick={this.addPlayer}>Join This Game</button>
                        <button className="remove-player player-button" onClick={this.removePlayer}>Leave This Game</button>
                    </div>
                    <ul>
                        { 
                            game.players.map((player) => <GameShowPlayer player={player} />)
                        }
                        
                    </ul>
                    
                </div>

                <div>
                    <button className="owner-button start-game" onClick={this.startGame}>Start Game</button>
                    <button className="owner-button cancel-game" onClick={this.endGame}>Cancel Game</button>
                </div>
                <h1>{this.props.games.length}</h1>
                <h1>This is how many people are on each team {this.state.players.length}</h1>
                <h1>Team 1</h1>
                <ul>
                    {
                        this.state.players[0].map(player => <li>{player.handle}</li>)
                    }
                </ul>
                <br/>
                <h1>Team 2</h1>
                <ul>
                    {
                        this.state.players[1].map(player => <li>{player.handle}</li>)
                    }
                </ul>


            </div>
        )
    }

}

export default GameShow
