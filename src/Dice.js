import React from 'react';

export default function Dice(props) {
  const  styles = {
    backgroundColor: props.isheld ? "green" : "white"
  }
  return (
    <div className='Dice' style={styles} onClick={props.holdDice}>
          <h2 className='dice-value'>
            {props.value}
          </h2>
    </div>
  );
}
