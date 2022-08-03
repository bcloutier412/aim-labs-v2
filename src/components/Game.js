import React from "react";
import "./Game.css";

const wait = function (seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};
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
      top: this.getRandomNum(this.numOfRows, this.props.targetDiameter),
      left: this.getRandomNum(this.numOfCols, this.props.targetDiameter),
    };
  }
  getRandomNum(num, targetDiameter) {
    return (Math.floor(Math.random() * (num - 0)) + 0) * targetDiameter;
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
          if (this.props.inPlay) {
            this.props.calculateStats();
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
          }
        }}
      ></div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // minute: this.props.minute,
      minute: 0,
      second: 5,
    };
  }
  formatSeconds(second) {
    if (second < 10) {
      return "0" + second;
    }
    return second;
  }
  runTimer() {
    if(this.state.minute === 0 && this.state.second === 0) {
      return
    }
    else if (this.state.second === 0) {
      this.setState({ minute: this.state.minute - 1, second: 59 })
      setTimeout(() => {
        this.runTimer()
      }, 1000);
    } else {
      this.setState({second: this.state.second - 1})
      if(this.state.minute === 0 && this.state.second === 1) {
        this.props.stopPlay()
      }
      setTimeout(() => {
        this.runTimer()
      }, 1000);
    }
  }
  componentDidMount() {
    this.runTimer();

  }
  render() {
    return (
      <span>
        {this.state.minute}:{this.formatSeconds(this.state.second)}
      </span>
    );
  }
}
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 3,
      showCountdown: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ countdown: 2 });
      setTimeout(() => {
        this.setState({ countdown: 1 });
        setTimeout(() => {
          this.setState({ countdown: "GO!" });
          setTimeout(() => {
            this.props.startPlay();
            this.setState({ showCountdown: false });
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
  render() {
    if (this.state.showCountdown) {
      return <div className="warn">{this.state.countdown}</div>;
    } else {
      return null;
    }
  }
}
/*
  In Game Stats Component
  @Desc: This component will render the time, score, and accuracy variables. It also houses the funtionality of the timer

*/
function InGameStats(props) {
  let timer;
  if (props.startTimer) {
    timer = (
      <Timer
        minute={props.minute}
        startTimer={props.startTimer}
        stopPlay={props.stopPlay}
      />
    );
  } else {
    timer = `${props.minute}:00`;
  }
  return (
    <div className="in-game-stats">
      {timer} | {props.score} | {props.accuracy}%
      <Countdown inPlay={props.inPlay} startPlay={props.startPlay} />
    </div>
  );
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
      startTimer: false,
    };
  }
  increaseTotalShots() {
    this.totalShots += 1;
  }
  calculateAccuracy() {
    let accuracy = (this.targetsHit / this.totalShots) * 100;
    accuracy = accuracy.toString().slice(0, 4);
    this.setState({ accuracy: parseInt(accuracy) });
  }
  calculateStats() {
    this.totalShots += 1;
    this.targetsHit += 1;
    let accuracy = (this.targetsHit / this.totalShots) * 100;
    accuracy = accuracy.toString().slice(0, 4);
    new Promise((resolve, reject) => {
      resolve(this.setState({ accuracy: parseInt(accuracy) }));
    }).then(() => {
      this.setState({
        score: this.state.score + 1000 * (this.state.accuracy / 100),
      });
    });
  }
  startPlay() {
    this.setState({ inPlay: true, startTimer: true });
  }
  stopPlay() {
    this.setState({ inPlay: false });
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
          calculateStats={this.calculateStats.bind(this)}
          inPlay={this.state.inPlay}
        />
      );
    }
    return (
      <div>
        <InGameStats
          score={this.state.score}
          accuracy={this.state.accuracy}
          minute={this.props.minute}
          inPlay={this.state.inPlay}
          startTimer={this.state.startTimer}
          startPlay={this.startPlay.bind(this)}
          stopPlay={this.stopPlay.bind(this)}
        />
        <div
          className="game-board"
          onClick={() => {
            if (this.state.inPlay) {
              this.increaseTotalShots();
              this.calculateAccuracy();
            }
          }}
        >
          {array}
        </div>
      </div>
    );
  }
}
export default Game;
