import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    const deckResponse = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    ).then((response) => response.json());

    let deckID = deckResponse.deck_id;

    const cardsResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=12`
    ).then((response) => response.json());

    setCards(cardsResponse.cards);
  }

  useEffect(() => {
    if (cards.length > 0) return // Only run this if cards is empty.

    getCards().catch(console.error);
  }, [cards]);

  return (
    <div className="App">
      <ul>
        {cards.map((card) => (
          <li key={card.code}><img src={card.image} alt={`${card.suit} OF ${card.value}`} /></li>
        ))}  
      </ul>
    </div>
  );
}

export default App;
