import * as APIUtil from '../util/map_util';

export const RECIEVE_ADRESS = 'RECIEVE_ADRESS';

export const getMap = adress => ({
  type: RECIEVE_ADRESS,
  adress
});

export const getAdress = (adress) => dispatch => {
  return APIUtil.getAdress(adress).then( (res) => dispatch(getMap(adress)))
}