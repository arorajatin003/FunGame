import React, { useState, useEffect } from "react";
import Dice from "../Dice/dice"
import "./styles.css"
const PLayArea = ()=>{
    const [diceData, setdiceData] = useState([]);
    const [first, setFirst] = useState(0);
    const [roleNum, setRollNum] = useState(0);
    const [best, setBest] = useState(100000);
    const [currSetBits, setCurrentBits] = useState(1);
    const [win, setWin] = useState(false);
    useEffect(()=>{
        let arr = []
        for(var i=0;i<6;i++){
            const num = Math.floor((Math.random()*6)) +1;
            const data = {
                freeze: false,
                number: num,
            }
        
            arr.push(data);
        }
        setdiceData([...arr])
        // console.log("Data",diceData);
        console.log("first",first);
        console.log("currSetBits",currSetBits);

    },[win])
    const play = ()=>{
        var arr = [];
        diceData.map(data=>{
            const num = Math.floor((Math.random()*6)) +1;
            if(data.freeze)arr.push(data);
            else{
                const newData ={
                    freeze:false,
                    number:num
                }
                arr.push(newData);
            }
        })
        setdiceData([...arr]);
        setRollNum(roleNum+1);
        console.log("Play clicked");
    }
    const click = (key)=>{
        let arr = diceData
        const clicked = Number(arr[key].number);
        const change = !arr[key].freeze
        if(first===0){
            setFirst(clicked);
            setCurrentBits(currSetBits+1);
        }
        if(clicked===first && change){
            setCurrentBits(currSetBits+1);
            console.log("I am here");
        }
        else if(clicked===first && !change)setCurrentBits(currSetBits-1);
        checkForWinner();


        arr[key].freeze = !arr[key].freeze;
        setdiceData([...arr]);

        console.log(first, currSetBits, clicked)
    }
    const checkForWinner = ()=>{
        if(currSetBits==6){
            setWin(true);
            if(roleNum<best)setBest(roleNum);
        }
    }
    return(
        <div className="playArea">
            {win && <div>Wooohooo..... you won the game</div>}
            <div className="playArea__heading">
                Roll The Dice
            </div>
            <div className="playArea__instructions">
                Roll until all dice are the same.<br />
                Click each dice to freeze it at its current value<br />
                between rolls.
            </div>
            <div className="playGame__dices">
                {
                    diceData.map((data,idx)=>(
                        <div onClick={()=>click(idx)}>
                        <Dice key={idx} num={data.number} freeze={data.freeze}/>
                        </div>
                    ))
                    
                }
            </div>
            <div className="playGame__playButton" onClick={()=>play()}>
                Roll
            </div>
            <div className="playGame__bottomContainer">
                <div className="playGame__text">
                    Moves: {roleNum}
                </div>
                <div className="playGame__text">
                    Best: {best}
                </div>
            </div>
        </div>
    )
}

export default PLayArea;