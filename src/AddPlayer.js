import React from "react";
import "./styles/AddPlayer.css";

const AddPlayer = props => {
  return (
    <div className="addPlayerContainer">
      {props.admin ? (
        <div>
          <input
            value={props.inputValue}
            onChange={props.getInputValue}
          ></input>
          <button onClick={props.addNewPlayer}>New player</button>
        </div>
      ) : null}
    </div>
  );
};

export default AddPlayer;
