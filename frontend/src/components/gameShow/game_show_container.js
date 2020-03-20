// import { connect } from 'react-redux';
// import { getGame, getGames } from '../../actions/game_actions';
// import GameShow from './game_show';

// const mSTP = (state, ownProps) => ({
//     games: Object.values(state.games),
//     game: state.games[ownProps.match.params.gameId],
//     player: state.session.user
// })

// const mDTP = dispatch => ({
//     getGame: gameId => dispatch(getGame(gameId)),
//     getGames: () => dispatch(getGames())
// })

// export default connect(mSTP, mDTP)(GameShow)