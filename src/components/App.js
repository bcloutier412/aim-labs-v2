import React from "react";
import Menu from "./Menu";
import Game from "./Game";
import EndGameStats from "./EndGameStats";
import Stats from "./Stats";
import Header from "./Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameStage: "Menu",
    };
  }
  render() {
    let stage;
    switch (this.state.gameStage) {
      case "Menu":
        stage = <Menu />;
        break;
      case "Game":
        stage = <Game />;
        break;
      case "EndGameStats":
        stage = <EndGameStats />;
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
