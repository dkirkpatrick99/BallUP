import React from 'react';
import Courts from './courts';
import { connect } from 'react-redux';
import {getGames, createGame, updateGame} from '../../actions/game_actions';
import { getAddress } from '../../actions/map_actions'

const mapStateToProps = (state) => {
    return{
        games: Object.values(state.games.all),
        // location: '22 Main st Boston MA'
    }
}


const mapDispatchToProps = (dispatch) => ({
    getGames: () => dispatch(getGames()),
    getAddress: (address) => dispatch(getAddress(address)),
    createGame: (game) => dispatch(createGame(game)),
    updateGame: (game) => dispatch(updateGame(game))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courts);