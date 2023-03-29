import React from "react";
import './styles.css'
const Dice = ({num, freeze})=>{
    
    return(
        <div className={`dice ${freeze && "clicked"}`}>
            {num}
        </div>
    );
}

export default Dice;