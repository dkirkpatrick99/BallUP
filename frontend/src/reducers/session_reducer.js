import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_USERS
} from "../actions/session_actions";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
            // return Object.assign({}, state, {
            //   [action.currentUser.id]: action.currentUser
            // });
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        // case RECEIVE_USERS:
        //     return action.users
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true
            }
        default:
            return state;
    }
}