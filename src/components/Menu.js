import React from "react";
import "./Menu.css";
function Menu(props) {
  return (
    <>
      <div className="menu-btns">
        <div className="menu-btn top-btn">START</div>
        <div className="menu-btn">TARGET SIZE</div>
        <div className="menu-btn">COLOR</div>
        <div className="menu-btn">1 MINUTE</div>
        <div className="menu-btn bottom-btn">CLEAR DATA</div>
      </div>
    </>
  );
}

export default Menu;
