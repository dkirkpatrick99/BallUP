import jwt_decode from 'jwt-decode';
import * as APIUtil from '../util/game_util';

export const RECIEVE_GAME = "RECIEVE_GAME";
export const RECIEVE_GAMES = "RECIEVE_GAMES";


export const recieveGame = game => ({
  type: RECIEVE_GAME,
  game
});

export const recieveGames = games => ({
  type: RECIEVE_GAMES,
  games
});

export const getGames = () => dispatch => {
  return APIUtil.getGames().then( games => dispatch(recieveGames(games)) )
};

export const getGame = gameId => dispatch => {
  return APIUtil.getGame(gameId).then( game => dispatch(recieveGame(game)))
};

export const createGame = (game) => dispatch => {
  return APIUtil.createGame(game).then( game => dispatch(recieveGame(game)))
};

export const updateGame = (game) => dispatch => {
  debugger
  return APIUtil.updateGame(game).then( game => dispatch(recieveGame(game)))
};

