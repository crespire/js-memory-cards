import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState();

  const getCards = async () => {
    const deckResponse = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    ).then((response) => response.json());

    let deckID = deckResponse.deck_id;
    console.log(deckID);
    const cardsResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=12`
    ).then((response) => response.json());

    setCards(cardsResponse.cards);
  }

  useEffect(() => {
    getCards().catch(console.error);
  }, []); // We use the empty array here to run the side effect like a componentDidMount lifecycle

  return (
    <div className="App">
      <ul>
        {cards.map((card) => (
          <li>Card Code: {card.code}</li>
        ))}  
      </ul>
    </div>
  );
}

export default App;
