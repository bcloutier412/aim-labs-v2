import React from "react";
import "./Menu.css";

function StartBtn(props) {
  return (
    <div className="menu-btn top-btn" onClick={props.onClick}>
      START
    </div>
  );
}

function TargetSelect() {
  return (
    <div className="menu-btn">
      <select className="target-size-select">
        <option value="medium">TARGET SIZE</option>
        <option value="hard">SMALL</option>
        <option value="medium">MEDIUM</option>
        <option value="easy">LARGE</option>
      </select>
    </div>
  );
}

class ColorSelect extends React.Component {
  render() {
    return (
      <div className="menu-btn">
        COLOR
        <input
          className="color"
          type="color"
          value="#24B7C2"
          onChange={() => {}}
        />
      </div>
    );
  }
}

function MinutesSelect() {
  return (
    <div className="menu-btn">
      <select className="minutes-select">
        <option value="1">1 MINUTE</option>
        <option value="2">2 MINUTES</option>
        <option value="3">3 MINUTES</option>
      </select>
    </div>
  );
}

function ClearDataBtn() {
  return <div className="menu-btn bottom-btn">CLEAR DATA</div>;
}
function Menu(props) {
  
  return (
    <>
      <div className="menu-btns">
        <StartBtn onClick={props.startGame}/>
        <TargetSelect />
        <ColorSelect />
        <MinutesSelect />
        <ClearDataBtn />
      </div>
    </>
  );
}

export default Menu;
