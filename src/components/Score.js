import React from 'react';

function Score(props) {
  return (
    <span>
      Current Score: {props.score} | Best Score: {props.bestScore}
    </span>
  );
}

export default Score;