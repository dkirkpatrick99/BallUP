import jwt_decode from 'jwt-decode';
import * APIUtil from '../util/game_util';

export const RECIEVE_GAME = "RECIEVE_GAME";
export const RECIEVE_GAMES = "RECIEVE_GAMES";


export const recieveGame = game => ({
  type: RECIEVE_GAME,
  game
});

export const recieveGames = games => ({
  type: RECIEVE_GAME,
  games
});

export const getGames = () => {
  return APIUtil.
}