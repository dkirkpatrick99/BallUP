import React from "react";

const gameItem = props => {
  debugger;
  let date = `${props.game.game_date.slice(5, 7)} /
  ${props.game.game_date.slice(8, 10)}
  / ${props.game.game_date.slice(0, 4)}`;

  return (
    <div>
      <h3><strong>{props.game.title}</strong></h3>
      <h3>{props.game.location}</h3>
      <h3>{props.game.time}</h3>
      <h3>{date}</h3>
    </div>
  )
}

export default gameItem