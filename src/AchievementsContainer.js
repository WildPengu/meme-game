import React from "react";
import "./styles/AchievementsContainer.css";

const AchievementsContainer = props => {
  const achievements = props.players.map(({ achievements }, i) => (
    <div key={i} className="playerAchievements">
      {achievements.map((achievement, j) => (
        <div
          key={j}
          className="achievement"
          style={{ backgroundImage: `url(${achievement})` }}
        ></div>
      ))}
    </div>
  ));

  return (
    <div className="achievementsContainer">
      {props.rounds > 1 ? achievements : null}
    </div>
  );
};

export default AchievementsContainer;
