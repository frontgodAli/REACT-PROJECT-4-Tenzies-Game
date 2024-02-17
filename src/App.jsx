import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import Die from './components/Die'
import './index.css'
import Confetti from 'react-confetti'

function App() {
  const [tenzies,setTenzies]=useState(false)
  const [dice,setDice]=useState(allNewDice)
  const diceElements=dice.map(die => <Die holdDice={()=>holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld}/>)

  useEffect(()=>{
    const testHeld=dice.every(die=>die.isHeld)
    const firstValue=dice[0].value
    const testValue=dice.every(die=>die.value===firstValue)
    if(testHeld && testValue){
      console.log("you won")
      setTenzies(true)
    }
  },[dice])

  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push({
        id:nanoid(),
        value:Math.ceil(Math.random()*6),
        isHeld:false
      })
    }
    return newDice
  }

  function rollDice(){
    if(tenzies){
      setTenzies(false)
      setDice(allNewDice())
    }else{
      setDice(prevDice=>prevDice.map(die=>{
        return die.isHeld?die:{
          id:nanoid(),
          value:Math.ceil(Math.random()*6),
          isHeld:false
        }
      }))
    }
  }

  function holdDice(id){
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id===id? {...die,isHeld:!die.isHeld}:die
      })
    })
}     
    

  return(<main>
      {tenzies&&<Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElements}
      </div>
      <button className='roll' onClick={rollDice}>{tenzies?"New game":"Roll"}</button>
    </main>)
}

export default App
