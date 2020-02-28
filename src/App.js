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
    players: [
      {
        id: 1,
        name: "Puszek",
        points: 5
      },
      {
        id: 2,
        name: "Mickiewicz",
        points: 0
      },
      {
        id: 3,
        name: "Muffinka",
        points: 17
      }
    ]
  };

  inputValidation = () => {
    if (this.state.addPlayer === "") {
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
        name: this.state.addPlayer,
        points: 0
      };
      this.idCounter++;

      this.setState(previousState => {
        return { players: [...previousState.players, newPlayer] };
      });
      this.setState({
        addPlayer: ""
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

  AddPoints = id => {
    let players = this.state.players;
    players.findIndex(player => {
      if (player.id === id) {
        player.points++;
      }
    });

    this.setState({ players });
  };

  changeAdminStatus = () => {
    this.setState({
      admin: !this.state.admin
    });
  };

  render() {
    return (
      <div className="gameContainer">
        <AddPlayer
          inputValue={this.state.addPlayer}
          getInputValue={this.getInputValue}
          addNewPlayer={this.addNewPlayer}
        />
        <Team
          players={this.state.players}
          deletePlayer={this.deletePlayer}
          admin={this.state.admin}
          AddPoints={this.AddPoints}
        />
        <Admin changeAdminStatus={this.changeAdminStatus} />
      </div>
    );
  }
}

export default App;
