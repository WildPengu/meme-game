import React from "react";
import "./styles/Team.css";

const Team = props => {
  const player = props.players.map((player, i) => (
    <div className="player" key={player.id}>
      <span>{player.name}</span>
      <div>
        <span>{player.points}</span>
        <button onClick={() => props.AddPoints(player.id)}>+</button>
        {props.admin ? (
          <button onClick={() => props.deletePlayer(player.id)}>X</button>
        ) : null}
      </div>
    </div>
  ));

  return <div className="teamContainer">{player}</div>;
};

export default Team;
