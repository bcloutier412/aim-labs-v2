import React from "react";
import './Game.css'

function Game(props) {
    return(
        <div>This is the game {props.targetDiameter}{props.targetColor}{props.minute}</div>
    )
}

export default Game