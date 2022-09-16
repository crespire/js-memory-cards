import React from 'react';

function Score(props) {
  return (
    <div className="">
      Current Score: {props.score} | Best Score: {props.bestScore}
    </div>
  );
}

export default Score;