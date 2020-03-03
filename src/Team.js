import React from "react";
import "./styles/Team.css";
import Player from "./Player";

const Team = props => {
  const player = props.players.map((player, i) => (
    <Player
      key={i}
      player={player}
      addPoints={props.addPoints}
      substractPoint={props.substractPoint}
      deletePlayer={() => props.deletePlayer(i)}
      admin={props.admin}
      canRemove={props.lastActionId}
    />
  ));

  return <div className="teamContainer">{player}</div>;
};

export default Team;
