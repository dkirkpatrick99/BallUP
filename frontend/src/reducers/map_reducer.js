import {
  RECIEVE_ADDRESS
} from '../actions/map_actions';

const MapReducer = (state = {}, action ) => {
  
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECIEVE_ADDRESS:
      return action.address;
    default:
      return state;
  }
}

export default MapReducer;