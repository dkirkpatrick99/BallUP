import React from "react";

const gameItem = props => {
  return (
    <div>
      <h3><strong>{props.game.title}</strong></h3>
      <h3>{props.game.location}</h3>
      <h3>{props.game.time}</h3>
      <h3>{props.game.game_date}</h3>
    </div>
  )
}

export default gameItem