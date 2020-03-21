import React from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map'

class GameShow extends React.Component {
    constructor(props) {
        super(props);
        this.addPlayer = this.addPlayer.bind(this)
        this.removePlayer = this.removePlayer.bind(this)
        this.endGame = this.endGame.bind(this)
        this.startGame = this.startGame.bind(this)
        this.state = {id: this.props.match.params.gameId, game: {}, teamOne: {
            pointGaurd: '', shootingGaurd: '', smallForward: '', powerForward: '', center: '', total: 0
        },
        teamTwo: {
            pointGaurd: '', shootingGaurd: '', smallForward: '', powerForward: '', center: '', total: 0
        },}
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
        // e.preventDefault();
        // this.state.game.players.forEach(player => {
        //     if (player.id !== this.props.player.id) {
        //         newPlayers.push(player)
        //     }
        // });
        // this.state.game.players = newPlayers
        // this.props.updateGame(this.state.game);
    };

    startGame(e) {
        // let count = 1;
        // this.state.game.players.forEach(player => {
        //     if (count % 2 !== 0) {
        //         this.state.teamOne.push(player)
        //     } else {
        //         this.state.teamTwo.push(player)
        //     };
        //     count += 1
        // });
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

        

    if (game.players.length === 10) {
        document.getElementsByClassName("add-player").style.display = "none";
        document.getElementsByClassName("full-game").style.display = "block";
        document.getElementsByClassName("owner-button").style.display = "none";
    } 
    
    if (game.players.includes(this.props.player)){
        document.getElementsByClassName("add-player").style.display = "none";
        document.getElementsByClassName("remove-player").style.display = "block";
    }

    // if (game.players.first === this.props.player) {
    //     document.getElementsByClassName("add-player").style.display = "none";
    //     document.getElementsByClassName("remove-player").style.display = "none";
    //     document.getElementsByClassName("owner-button").style.display = "block";
    // } else {
    //     document.getElementsByClassName("owner-button").style.display = "none";
    // }
        
        return (
            <div>
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

                {/* <div>
                    <MapContainer />
                </div> */}
                <div>
                    <button className="owner-button start-game" onClick={this.startGame}>Start Game</button>
                    <button className="owner-button cancel-game" onClick={this.endGame}>Cancel Game</button>
                </div>
                <h1>{this.props.games.length}</h1>
            </div>
        )
    }

}

export default GameShow
