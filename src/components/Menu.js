import React from "react";
import "./Menu.css";

function StartBtn(props) {
  return (
    <div className="menu-btn top-btn" onClick={props.onClick}>
      START
    </div>
  );
}

function TargetSelect(props) {
  return (
    <div className="menu-btn">
      <select className="target-size-select" onChange={props.onChange}>
        <option value="48">TARGET SIZE</option>
        <option value="28">SMALL</option>
        <option value="48">MEDIUM</option>
        <option value="68">LARGE</option>
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
        <TargetSelect onChange={props.changeTargetDiameter}/>
        <ColorSelect />
        <MinutesSelect />
        <ClearDataBtn />
      </div>
    </>
  );
}

export default Menu;
