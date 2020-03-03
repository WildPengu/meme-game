import React from "react";

const Player = props => {
  console.log(props.player.style);
  return (
    <div className="player" key={props.player.id}>
      <span>{props.player.name}</span>
      <div className="playerImagesContainer">
        <span className="playerPoints">{props.player.points}</span>
        {props.admin ? (
          <span className="playerAnswers">({props.player.goodAnwsers})</span>
        ) : null}
        <div
          className="addPoints"
          onClick={() => props.addPoints(props.player.id)}
        ></div>
        {props.admin && props.lastActionId === props.player.id ? (
          <div
            style={props.player.style}
            className="substractPoints"
            onClick={() => props.substractPoint(props.player.id)}
          ></div>
        ) : null}
        {props.admin ? (
          <i
            className="trash alternate icon"
            onClick={() => props.deletePlayer(props.player.id)}
          ></i>
        ) : null}
      </div>
    </div>
  );
};

export default Player;
