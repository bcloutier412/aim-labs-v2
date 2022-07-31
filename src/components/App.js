import React from "react";
import Menu from "./Menu";
import Game from "./Game";
import EndGameStats from "./EndGameStats";
import Stats from "./Stats";
import Header from "./Header";

function game() {
  this.targetGap = 3;
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameStage: "Menu",
      targetDiameter: 48 + game.targetGap,
      targetColor: "#24B7C2",
      minute: 1
    };
  }

  startGame() {
    this.setState({ gameStage: "Game" })
  }
  render() {
    let stage;
    switch (this.state.gameStage) {
      case "Menu":
        stage = <Menu startGame={this.startGame.bind(this)}/>;
        break;
      case "Game":
        stage = <Game />;
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
