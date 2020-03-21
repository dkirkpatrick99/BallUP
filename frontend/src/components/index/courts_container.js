import React from 'react';
import Courts from './courts';
import { connect } from 'react-redux';
import {getGames} from '../../actions/game_actions'

const mapStateToProps = (state) => {
    debugger
    return{
        games: Object.values(state.games.all)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getGames: () => dispatch(getGames())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courts);