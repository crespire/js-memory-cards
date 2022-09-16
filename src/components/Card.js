import React from 'react';

function Card(props) {
  return (
    <div className="p-2">
      <img className="flex-auto" onClick={() => { props.handleClick(props.card.code) }} src={props.card.image} alt={`${props.card.value} OF ${props.card.suit}`} />
    </div>
  );
}

export default Card;