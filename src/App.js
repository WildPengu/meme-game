import React from "react";
import "./styles/App.css";
import Team from "./Team";
import AddPlayer from "./AddPlayer";
import Admin from "./Admin";
import calmDownDude from "./images/memes/calmDown.jpg";
import AchievementsContainer from "./AchievementsContainer";
import disabled from "./images/memes/disabled.jpg";
import youSickMan from "./images/memes/ddd.png";
import baka from "./images/memes/baka.jpg";
import ruinedDay from "./images/memes/eca.jpg";
import dabPengu from "./images/emotes/dabPengu.PNG";
import beeHappy from "./images/emotes/beeHappy.PNG";
import happyCat from "./images/emotes/happyCat.PNG";
import happyPengu from "./images/emotes/happyPengu.PNG";
import jinx from "./images/emotes/jinx.PNG";
import meow from "./images/emotes/meow.PNG";
import rammus from "./images/emotes/rammus.PNG";
import iLoveIt from "./images/emotes/iLoveIt.PNG";

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
        points: 0,
        getPointRecently: false,
        style: { opacity: "0.5" },
        achievements: [],
        series: 0,
        coldSeries: 0
      },
      {
        id: 2,
        name: "Mickiewicz",
        points: 0,
        getPointRecently: false,
        style: { opacity: "0.5" },
        achievements: [],
        series: 0,
        coldSeries: 0
      },
      {
        id: 3,
        name: "Muffinka",
        points: 0,
        getPointRecently: false,
        style: { opacity: "0.5" },
        achievements: [],
        series: 0,
        coldSeries: 0
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
        error: "Type player name"
      });
      return false;
    } else if (this.trimInputValue().length > 15) {
      this.setState({
        error: "Your nick is too long"
      });
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
        style: { opacity: "0.5" },
        achievements: [],
        series: 0,
        coldSeries: 0
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

  subtractPoint = id => {
    let players = this.state.players;
    players.findIndex(player => {
      if (player.id === id && player.getPointRecently) {
        if (player.points - (this.state.pointsAmount - 1) < 0) {
          player.getPointRecently = false;
          player.points = 0;
          player.style = { opacity: "0.5" };
          player.series--;
        } else {
          player.points = player.points - (this.state.pointsAmount - 1);
          player.getPointRecently = false;
          player.style = { opacity: "0.5" };
          player.series--;
        }
        this.setState({
          players,
          pointsAmount: this.state.pointsAmount - 1
        });
      }
    });
    players.findIndex(player => {
      if (player.id !== id) {
        player.coldSeries--;
        this.setState({
          players
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

  setPlayerSeries = (id, players) => {
    players.findIndex(player => {
      if (player.id === id) {
        player.series++;
      } else {
        player.series = 0;
      }
      if (player.id !== id) {
        player.coldSeries++;
      } else {
        player.coldSeries = 0;
      }
    });
    return players;
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
    players = this.setPlayerSeries(id, players);
    this.setDeleteToUnactive(id);
    this.setState({
      players,
      pointsAmount: this.state.pointsAmount + 1
    });
  };

  changeAdminStatus = () => {
    this.setState({
      admin: !this.state.admin,
      error: ""
    });
  };

  checkAchievementsForDuplicates = (player, image) => {
    let noDuplicate = true;
    player.achievements.map(achievement => {
      if (achievement === image) {
        noDuplicate = false;
      }
    });
    return noDuplicate;
  };

  addAchievementSeries = (image, player, whenActive, series) => {
    if (
      series === whenActive &&
      this.checkAchievementsForDuplicates(player, image)
    ) {
      player.achievements.push(image);
    }
  };

  addAchievementFirstBlood = (image, player, round) => {
    if (
      round === 2 &&
      this.checkAchievementsForDuplicates(player, image) &&
      player.series > 0
    ) {
      player.achievements.push(image);
    }
  };

  addAchievementPoints = (image, player, mileStone) => {
    if (
      player.points >= mileStone &&
      this.checkAchievementsForDuplicates(player, image)
    ) {
      player.achievements.push(image);
    }
  };

  setAchievements = () => {
    const round = this.state.pointsAmount;
    const players = this.state.players.map(player => {
      this.addAchievementSeries(calmDownDude, player, 3, player.series);
      this.addAchievementSeries(youSickMan, player, 5, player.series);
      this.addAchievementSeries(baka, player, 5, player.coldSeries);
      this.addAchievementSeries(disabled, player, 7, player.coldSeries);
      this.addAchievementSeries(ruinedDay, player, 10, player.coldSeries);
      this.addAchievementFirstBlood(dabPengu, player, round);
      this.addAchievementPoints(beeHappy, player, 5);
      this.addAchievementPoints(happyCat, player, 10);
      this.addAchievementPoints(happyPengu, player, 20);
      this.addAchievementPoints(iLoveIt, player, 30);
      this.addAchievementPoints(jinx, player, 50);
      this.addAchievementPoints(meow, player, 100);
      this.addAchievementPoints(rammus, player, 250);
    });
    return players;
  };

  render() {
    this.setAchievements();
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
        {this.state.players.length > 0 ? (
          <div className="pointsAmount">
            Next reward: +{this.state.pointsAmount}
          </div>
        ) : null}

        {this.state.players.length > 0 ? (
          <div style={{ display: "flex" }}>
            <Team
              players={this.state.players}
              deletePlayer={this.deletePlayer}
              admin={this.state.admin}
              addPoints={this.addPoints}
              substractPoint={this.subtractPoint}
            />
            <AchievementsContainer
              players={this.state.players}
              rounds={this.state.pointsAmount}
            />
          </div>
        ) : (
          <div className="noPlayersInfo">You should add players</div>
        )}
      </div>
    );
  }
}

export default App;
