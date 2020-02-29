import React from "react";
import "./styles/App.css";
import Team from "./Team";
import AddPlayer from "./AddPlayer";
import Admin from "./Admin";
class App extends React.Component {
  idCounter = 4;
  state = {
    admin: false,
    addPlayer: "",
    error: "",
    pointsAmount: 1,
    players: [
      {
        id: 1,
        name: "Puszek",
        points: 5,
        getPointRecently: false,
        style: { opacity: "0.5" }
      },
      {
        id: 2,
        name: "Mickiewicz",
        points: 0,
        getPointRecently: false,
        style: { opacity: "0.5" }
      },
      {
        id: 3,
        name: "Muffinka",
        points: 17,
        getPointRecently: false,
        style: { opacity: "0.5" }
      }
    ]
  };

  trimInputValue = () => {
    let inputValue = this.state.addPlayer;
    inputValue = inputValue.trim();
    this.setState({
      addPlayer: inputValue
    });
    return inputValue;
  };

  inputValidation = () => {
    if (this.trimInputValue() === "") {
      this.setState({
        error: "Pole jest puste"
      });
      return false;
    } else {
      return true;
    }
  };

  addNewPlayer = () => {
    if (this.inputValidation()) {
      const newPlayer = {
        id: this.idCounter,
        name: this.trimInputValue(),
        points: 0,
        style: { opacity: "0.5" }
      };
      this.idCounter++;

      this.setState(previousState => {
        return { players: [...previousState.players, newPlayer] };
      });
      this.setState({
        addPlayer: "",
        error: ""
      });
    }
  };

  getInputValue = e => {
    this.setState({
      addPlayer: e.target.value
    });
  };

  deletePlayer = id => {
    let players = this.state.players.filter(player => {
      return player.id !== id;
    });
    this.setState({ players });
  };

  substractPoint = id => {
    let players = this.state.players;
    players.findIndex(player => {
      if (player.id === id && player.getPointRecently) {
        if (player.points - (this.state.pointsAmount - 1) < 0) {
          player.getPointRecently = false;
          player.points = 0;
          player.style = { opacity: "0.5" };
        } else {
          player.points = player.points - (this.state.pointsAmount - 1);
          player.getPointRecently = false;
          player.style = { opacity: "0.5" };
        }
        this.setState({
          players,
          pointsAmount: this.state.pointsAmount - 1
        });
      }
    });
  };

  setDeleteToUnactive = id => {
    let players = this.state.players;
    players.findIndex(player => {
      if (player.id !== id) {
        player.getPointRecently = false;
        player.style = { opacity: "0.5" };
      }
    });
  };

  addPoints = id => {
    let players = this.state.players;
    players.findIndex(player => {
      if (player.id === id) {
        player.points = player.points + this.state.pointsAmount;
        player.getPointRecently = true;
        player.style = { opacity: "1" };
      }
    });
    this.setDeleteToUnactive(id);
    this.setState({ players, pointsAmount: this.state.pointsAmount + 1 });
  };

  changeAdminStatus = () => {
    this.setState({
      admin: !this.state.admin,
      error: ""
    });
  };

  render() {
    return (
      <div className="gameContainer">
        <div className="header">
          <AddPlayer
            inputValue={this.state.addPlayer}
            getInputValue={this.getInputValue}
            addNewPlayer={this.addNewPlayer}
            admin={this.state.admin}
            error={this.state.error}
          />
          <Admin changeAdminStatus={this.changeAdminStatus} />
        </div>
        <Team
          players={this.state.players}
          deletePlayer={this.deletePlayer}
          admin={this.state.admin}
          addPoints={this.addPoints}
          substractPoint={this.substractPoint}
        />
      </div>
    );
  }
}

export default App;
