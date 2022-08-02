import React from "react";
import "./Game.css";

//HELPER FUNCTIONS
/*
  @Desc: returns a random number based on the number of cols or rows and the target diameter
*/
function getRandomNum(num, targetDiameter) {
  return (Math.floor(Math.random() * (num - 0)) + 0) * targetDiameter;
}
/*
  Target Component
  @Desc: this component renders a div with the class of .target and onclick will;
  change its state to generate a new location on the screen, execute functions to increase score, 
  change accuracy, increase total shots.
*/
class Target extends React.Component {
  constructor(props) {
    super(props);
    this.numOfCols = Math.floor(
      (window.innerWidth * 0.8) / this.props.targetDiameter
    );
    this.numOfRows = Math.floor(
      (window.innerHeight * 0.9) / this.props.targetDiameter
    );
    this.state = {
      top: getRandomNum(this.numOfRows, this.props.targetDiameter),
      left: getRandomNum(this.numOfCols, this.props.targetDiameter),
    };
  }
  render() {
    return (
      <div
        style={{
          height: `${this.props.targetDiameter - 4}px`,
          width: `${this.props.targetDiameter - 4}px`,
          backgroundColor: `${this.props.targetColor}`,
          top: `${this.state.top}px`,
          left: `${this.state.left}px`,
        }}
        className="target"
        onClick={(e) => {
          this.props.increaseTotalShots();
          this.props.increaseTargetsHit();
          this.props.increaseScore();
          const newTop = getRandomNum(
            this.numOfRows,
            this.props.targetDiameter
          );
          const newLeft = getRandomNum(
            this.numOfCols,
            this.props.targetDiameter
          );
          this.setState({
            top: newTop,
            left: newLeft,
          });
          e.stopPropagation();
        }}
      ></div>
    );
  }
}

/*
  In Game Stats Component
  @Desc: This component will render the time, score, and accuracy variables. It also houses the funtionality of the timer

*/
class InGameStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: this.props.minute,
      second: 0,
    };
  }
  formatSeconds(second) {
    if (second < 10) {
      return '0' + second
    } 
    return second
  }
  render() {
    return (
      <div className="in-game-stats">
        {this.state.minute}:{this.formatSeconds(this.state.second)} | {this.props.score} |{" "}
        {this.props.accuracy}%
      </div>
    );
  }
}
/*
  Game Component
  @Desc: This component holds all the game data and handles the renders for said data to the dashbaord. 
  After the game is over this component will also instigate the end game statistics to populate
*/
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.totalShots = 0;
    this.targetsHit = 0;
    this.state = {
      inPlay: false,
      accuracy: 0,
      score: 0,
    };
  }
  increaseTotalShots() {
    this.totalShots += 1;
  }
  increaseTargetsHit() {
    this.targetsHit += 1;
  }
  increaseScore() {
    this.setState({ score: this.state.score + 1000 });
  }
  startPlay() {}
  render() {
    const array = [];
    for (let i = 0; i < 7; i++) {
      array.push(
        <Target
          targetDiameter={this.props.targetDiameter}
          targetColor={this.props.targetColor}
          minute={this.props.minute}
          key={i}
          increaseTotalShots={this.increaseTotalShots.bind(this)}
          increaseTargetsHit={this.increaseTargetsHit.bind(this)}
          increaseScore={this.increaseScore.bind(this)}
        />
      );
    }
    return (
      <div>
        <InGameStats
          score={this.state.score}
          accuracy={this.state.accuracy}
          minute={this.props.minute}
        />
        <div
          className="game-board"
          onClick={this.increaseTotalShots.bind(this)}
        >
          {array}
        </div>
      </div>
    );
  }
}
export default Game;
