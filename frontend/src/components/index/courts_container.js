import React from 'react';
import Courts from './courts';
import { connect } from 'react-redux';
import {getGames, createGame} from '../../actions/game_actions';
import {getAddress} from '../../actions/map_actions'

const mapStateToProps = (state) => {
    return{
        games: Object.values(state.games.all)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getGames: () => dispatch(getGames()),
    getAddress: (address) => dispatch(getAddress(address)),
    createGame: (game) => dispatch(createGame(game))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courts);