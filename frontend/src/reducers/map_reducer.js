import {
  RECIEVE_ADRESS
} from '../actions/map_actions';

const MapReducer = (state = {}, action ) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECIEVE_ADRESS:
      return action.adress;
    default:
      return state;
  }
}

export default MapReducer;