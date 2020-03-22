import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './session_errors_reducer';
import games from './game_reducer';
import users from './users_reducer';
import maps from './map_reducer';


const RootReducer = combineReducers({
    errors,
    session,
    games,
    users,
    maps
});

export default RootReducer;