import * as APIUtil from '../util/map_util';

export const RECIEVE_ADDRESS = 'RECIEVE_ADDRESS';

export const getMap = address => ({
  type: RECIEVE_ADDRESS,
  address
});

export const getAddress = (address) => dispatch => {
  return APIUtil.getAddress(address)
    .then( (address) => dispatch(getMap(address)))
}