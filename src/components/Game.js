import React from "react";
import "./Game.css";

/*
  Target Component
  @Desc: this component renders a div with the class of .target and onclick will;
  change its state to generate a new location on the screen, execute functions to increase score, 
  change accuracy, increase total shots.
*/
class Target extends React.Component {
  getRandomNum(num, targetDiameter) {
    return (Math.floor(Math.random() * (num - 0)) + 0) * targetDiameter;
  }
  constructor(props) {
    super(props);
    this.numOfCols = Math.floor(
      (window.innerWidth * 0.8) / this.props.targetDiameter
    );
    this.numOfRows = Math.floor(
      (window.innerHeight * 0.9) / this.props.targetDiameter
    );
    this.state = {
      top: this.getRandomNum(this.numOfRows, this.props.targetDiameter),
      left: this.getRandomNum(this.numOfCols, this.props.targetDiameter),
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
          const newTop = this.getRandomNum(
            this.numOfRows,
            this.props.targetDiameter
          );
          const newLeft = this.getRandomNum(
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
  Game Component
  @Desc: This component
*/
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: false,
      totalShots: 0,
      targetsHit: 0,
      accuracy: 0,
    };
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
        />
      );
    }
    return (
      <div className="game-board" onClick={() => {}}>
        {array}
      </div>
    );
  }
}
export default Game;
