import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.player.id,
      name: this.props.player.name,
      points: this.props.player.points,
      getPointRecently: this.props.player.getPointRecently,
      style: this.props.player.style,
      achievements: this.props.player.achievements,
      series: this.props.player.series,
      coldSeries: this.props.coldSeries,
      goodAnwsers: this.props.goodAnwsers
    };
  }

  render(props) {
    return (
      <div className="player" key={this.state.id}>
        <span>{this.state.name}</span>
        <div className="playerImagesContainer">
          <span className="playerPoints">{this.state.points}</span>
          {this.props.admin ? (
            <span className="playerAnswers">({this.state.goodAnwsers})</span>
          ) : null}
          <div
            className="addPoints"
            onClick={() => this.props.addPoints(this.state.id)}
          ></div>
          {this.props.admin && this.props.canRemove === this.state.id ? (
            <div
              style={this.state.style}
              className="substractPoints"
              onClick={() => this.props.substractPoint(this.state.id)}
            ></div>
          ) : null}
          {this.props.admin ? (
            <i
              className="trash alternate icon"
              onClick={() => this.props.deletePlayer()}
            ></i>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Player;
