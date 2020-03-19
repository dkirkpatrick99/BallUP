import React from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map'

class GameShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.match.params.gameId}
    }

    componentDidMount() {
        this.props.getGames();
        this.props.getGame(this.props.match.params.gameId)
    }

    render() {
        let game = "kk";
        this.props.games.forEach(g => {
            if (g._id === this.state.id) {
                game = g
            
            }
        debugger
        });
        
        return (
            <div>
                <h1>{game.location}</h1>
                <h2>{game.date}</h2>
                {/* <h1>{game.players.length}</h1> */}

                <div>
                    <div>
                        <button >Join This Game</button>
                    </div>
                    <ul>
                        {/* { 
                            game.players.map((player) => <GameShowPlayer player={player} />)
                        } */}
                        
                    </ul>
                    
                </div>

                <div>
                    <MapContainer />
                </div>
                <div>
                    <input type="submit" value="Start Game"/>
                </div>
                <h1>{this.props.games.length}</h1>
            </div>
        )
    }

}

export default GameShow