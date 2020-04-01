import {
  RECIEVE_ADDRESS
} from '../actions/map_actions';

const MapReducer = (state = {}, action ) => {
  
  Object.freeze(state);
  debugger
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECIEVE_ADDRESS:
      debugger
      return action.address;
    default:
      return state;
  }
}

export default MapReducer;