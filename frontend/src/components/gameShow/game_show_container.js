import { connect } from 'react-redux';
import { getGame, getGames, updateGame } from '../../actions/game_actions';
import { getUsers, getUser } from '../../actions/session_actions';
import GameShow from './game_show';

const mSTP = (state, ownProps) => {
    
    return {
    games: Object.values(state.games.all),
    game: state.games.all[ownProps.match.params.gameId],
    player: state.session.user.data,
    users: Object.values(state.games.all)
    }
}

const mDTP = dispatch => ({
    getGame: gameId => dispatch(getGame(gameId)),
    getGames: () => dispatch(getGames()),
    updateGame: (game) => dispatch(updateGame(game)),
    getUsers: () => dispatch(getUsers()),
    getUser: userData => dispatch(getUser(userData))
})

export default connect(mSTP, mDTP)(GameShow)