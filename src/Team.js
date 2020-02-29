import React from "react";
import "./styles/Team.css";

const Team = props => {
  const player = props.players.map((player, i) => (
    <div className="player" key={player.id}>
      <span>{player.name}</span>
      <div className="playerImagesContainer">
        <span className="playerPoints">{player.points}</span>
        <div
          className="addPoints"
          onClick={() => props.addPoints(player.id)}
        ></div>
        {props.admin ? (
          <div
            className="substractPoints"
            onClick={() => props.substractPoint(player.id)}
          ></div>
        ) : null}
        {props.admin ? (
          <i
            class="trash alternate icon"
            onClick={() => props.deletePlayer(player.id)}
          ></i>
        ) : null}
      </div>
    </div>
  ));

  return <div className="teamContainer">{player}</div>;
};

export default Team;
