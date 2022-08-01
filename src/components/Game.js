import React from "react";
import "./Game.css";

class Target extends React.Component {
  getRandomNum(num, targetDiameter) {
    return (Math.floor(Math.random() * (num - 0)) + 0) * targetDiameter
  }
  constructor(props) {
    super(props);
    const numOfCols = Math.floor((window.innerWidth * 0.8) / this.props.targetDiameter);
    const numOfRows = Math.floor((window.innerHeight * 0.9) / this.props.targetDiameter);
    this.state = {
      top: this.getRandomNum(numOfRows, this.props.targetDiameter),
      left: this.getRandomNum(numOfCols, this.props.targetDiameter)
    };
  }
  render() {
    const targetDiameter = this.props.targetDiameter;
    return (
      <div
        style={{
          height: `${targetDiameter - 4}px`,
          width: `${targetDiameter - 4}px`,
          backgroundColor: `${this.props.targetColor}`,
          top: `${this.state.top}px`,
          left: `${this.state.left}px`
        }}
        className="target"
      ></div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: false,
    };
  }
  startPlay() {
    
  }
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
    return <div className="game-board">{array}</div>;
  }
}
export default Game;
