import React from "react";
import "./Menu.css";

/*
  Start Button Component
  @Desc: This component, when pressed, will start the game
  @Props: onClick=>Will start the game
*/
function StartBtn(props) {
  return (
    <div className="menu-btn top-btn" onClick={props.startGame}>
      START
    </div>
  );
}

/*
  Target Select Component
  @Desc: This component will change the size of the target. A function was passed down so it would change the integer 
  that will be given to the game component to determine the size of the target
  @Props: onChange=>This will execute a function that was passed down from the App state, 
  the functionality relates to the statement above
*/
function TargetSelect(props) {
  return (
    <div className="menu-btn">
      <select className="target-size-select" onChange={props.changeTargetDiameter}>
        <option value="48">TARGET SIZE</option>
        <option value="28">SMALL</option>
        <option value="48">MEDIUM</option>
        <option value="68">LARGE</option>
      </select>
    </div>
  );
}

/* 
  Color Select Component
  @Desc: The color picker component will change the color of the target.
  @Props: onChange=>This will change the color value in the App state and also update 
  the state of this component to change the color shown in the color picker
*/
class ColorSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.targetColor
    }
  }
  render() {
    return (
      <div className="menu-btn">
        COLOR
        <input
          className="color"
          type="color"
          value={this.state.value}
          onChange={(e) => {
            this.props.changeTargetColor(e)
            this.setState({ value: e.target.value})
          }}
        />
      </div>
    );
  }
}

/*
  Minute Select Component
  @Desc: This component will change the the minute value in the App state
  @Props: onChange=>This function will do as was stated above
*/
function MinuteSelect(props) {
  return (
    <div className="menu-btn">
      <select className="minutes-select" onChange={props.changeMinute}>
        <option value="1">1 MINUTE</option>
        <option value="2">2 MINUTES</option>
        <option value="3">3 MINUTES</option>
      </select>
    </div>
  );
}

/*
  Clear Data
  @Desc: This button will clear the local storage data. However, this will eventually be removed as cloud storage is implemented
*/
function ClearDataBtn() {
  return <div className="menu-btn bottom-btn">CLEAR DATA</div>;
}

/*
  Menu Component
  @Desc: This will render all the different menu buttons and their functionality. 
  When the start button is clicked it will start the game. All the other buttons
  change values in the App state to be passed down to the Game component.
*/
function Menu(props) {
  
  return (
    <>
      <div className="menu-btns">
        <StartBtn startGame={props.startGame}/>
        <TargetSelect changeTargetDiameter={props.changeTargetDiameter}/>
        <ColorSelect changeTargetColor={props.changeTargetColor} targetColor={props.targetColor}/>
        <MinuteSelect changeMinute={props.changeMinute}/>
        <ClearDataBtn />
      </div>
    </>
  );
}

export default Menu;
