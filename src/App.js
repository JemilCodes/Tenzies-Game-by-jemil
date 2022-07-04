import React from 'react';
import './index.css'
import Dice from './Dice';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

export default function App() {
const [tenzies , setTenzies] = React.useState(false) 
const [time , setTime ] = React.useState({s:0,m:0})
const [count , setCount] = React.useState(0)
const [interv, setInterv] = React.useState();
const [startGame, setStartGame] = React.useState(true);

// TIME SECTION

  let seconds = time.s 
  let minutes = time.m
 
 const timer = () => {
   if (seconds === 59) {
    minutes++
    seconds=0
   }

  seconds++

  setTime({
    s:seconds,
    m:minutes
  })

  }
  
  const timeInterval = () => {
    if (!tenzies) {
      setInterv(setInterval(timer,1000))
    }
   
  }
  const startTime = () => {
    setStartGame(false)
    timeInterval()
  }

   if (tenzies) {
    clearInterval(interv)
  }

   // COUNT SECTION

  const counter = () => {
    setCount(count => count + 1)
  }
  

 // DICE SECTION

 const generateDice = () => {
  return {
    value:  Math.ceil(Math.random()*6) ,
    isheld: false ,
    id:nanoid()
   }
}

 const newDice = () => {
  let diceArray = []
  for (let i= 0; i < 10 ; i++) {
    diceArray.push(generateDice())
  }
  return diceArray
}

const [dice ,setDice] = React.useState(newDice())
    
    const diceRoller = () => {
    setDice(prevState => {
      return prevState.map(die => {
        return die.isheld === true ? die
        :
        generateDice()
      })
    })
    counter()   
  }
   const holdDice = (id) => {
    setDice((prevState)=> {
     return prevState.map((die)=> {
       return die.id === id ? {
          ...die,
          isheld:!die.isheld
        }
        :
        die
      })
    })
  }

   const mappedDice = dice.map((die) => {
     return <Dice key={die.id} value ={die.value} holdDice={()=> holdDice (die.id)} isheld={die.isheld}/>
  } )

  // MONITORING THE DICE STATE

  React.useEffect(()=>{
  const  allHeld =  dice.every((die)=>{
      return die.isheld === true
    })
  const  firstValue = dice[0].value
  const  allSamevalue = dice.every((die)=> {
     return die.value === firstValue
    })
    if (allHeld && allSamevalue) {
      setTenzies(true)
      console.log("you have won")
    }

  },[dice])

  // RESTART GAME FUNCTION

  const restartGame = () => {
    setTenzies(false)
    setStartGame(true)
    setDice(newDice())
    setCount(0)
    setTime({
      s:0,
      m:0
    })
  }

  return (
    <div className='App'>
    {tenzies && <Confetti
        />}
    <main className='main'>
    <h1>Tenzies</h1>
    <div className='instruction'>
      <p>
        Roll untill dice are the same.
        click each dice to freeze it at it's 
        current value between rolls
      </p>
    </div>
    <div className='time'>Time: {time.m >= 10 ? time.m
    :
    "0" + time.m} : {time.s >= 10 ? time.s
    :
    "0" + time.s}
     </div>
    <div className='rolls'><h3>Rolls: {count}</h3></div>
     {!startGame && <div className='container'>
      {mappedDice}   
      </div>
      }     
      { tenzies &&  <button className='button'  onClick={restartGame}>New Game</button>}
     { !tenzies && !startGame && <button className='button' onClick={diceRoller}>Roll</button>}
     { startGame && <button className='button' onClick={startTime}>Start Game</button>}
      </main>
    </div>
  );
}
