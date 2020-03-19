// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import GameShowPlayer from './game_show_player'
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import MapContainer from '../map/map'

// class GameShow extends React.Component {
//     constructor(props) {
//         super(props)
//     }


//     componentDidMount() {
//         this.props.getGames(),
//         this.props.getGame(this.props.match.params.gameId)
//     }

//     render() {

//         return (
//             <div>
//                 <h1>{this.props.game.title}</h1>

//                 <div>
//                     <div>
//                         <button onClick={this.addPlayer}>Join This Game</button>
//                     </div>
//                     <ul>
//                         { 
//                             this.props.game.players.map((player) => <GameShowPlayer player={player} />)
//                         }
//                     </ul>
//                 </div>

//                 <div>
//                     <MapContainer />
//                 </div>
//                 <div>
//                     <input type="submit" value="Start Game"/>
//                 </div>

//             </div>
//         )
//     }

// }

// export default GameShow