import React from "react";
import Menu from "./Menu";
import Game from "./Game";
import Stats from "./Stats";
import Header from "./Header";
const game = {
  targetGap: 3,
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameStage: "Menu",
      targetDiameter: 48 + game.targetGap,
      targetColor: "#24B7C2",
      minute: 1,
    };
  }
  changeTargetDiameter(e) {
    this.setState({
      targetDiameter: parseInt(e.target.value) + game.targetGap,
    });
  }
  changeTargetColor(e) {
    this.setState({ targetColor: e.target.value });
  }
  changeMinute(e) {
    this.setState({ minute: e.target.value });
  }
  startGame() {
    this.setState({ gameStage: "Game" });
  }
  render() {
    let stage;
    switch (this.state.gameStage) {
      case "Menu":
        stage = (
          <Menu
            startGame={this.startGame.bind(this)}
            changeTargetDiameter={this.changeTargetDiameter.bind(this)}
            changeTargetColor={this.changeTargetColor.bind(this)}
            changeMinute={this.changeMinute.bind(this)}
          />
        );
        break;
      case "Game":
        stage = (
          <Game
            targetDiameter={this.state.targetDiameter}
            targetColor={this.state.targetColor}
            minute={this.state.minute}
          />
        );
        break;
      case "Stats":
        stage = <Stats />;
        break;
      default:
        stage = <div>Error, Please Reload the Page</div>;
        break;
    }
    return (
      <>
        <Header />
        <div>{stage}</div>
      </>
    );
  }
}
export default App;
