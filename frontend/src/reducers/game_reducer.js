import { RECIEVE_GAME, RECIEVE_GAMES } from '../actions/game_actions';

const GameReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECIEVE_GAMES:
            newState.all = action.games.data;
            return newState;
        case RECIEVE_GAME:
            newState.new = action.game.data
            return newState;
        default:
            return state;
    }
};

export default GameReducer;