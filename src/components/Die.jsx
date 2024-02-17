export default function Die(props){

    return(
        <div onClick={props.holdDice} style={{ backgroundColor: props.isHeld ? "#59E391" : "white"}} className="die-face">
            <h2>{props.value}</h2>
        </div>
        
    )
}