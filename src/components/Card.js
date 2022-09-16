import React from 'react';

function Card(props) {
  return (
    <div className="">
      <img onClick={() => { props.handleClick(props.card.code) }} src={props.card.image} alt={`${props.card.value} OF ${props.card.suit}`} />
    </div>
  );
}

export default Card;