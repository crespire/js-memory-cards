# Implementation
The goal of the game is to click all the unique cards once, in which case you "win" the round and the game restarts.

Components:
* App
* Header
* ScoreDisplay
* Card

Likely have App component keep most of the state.

## Source cards
Maybe we can use the deckofcardsapi.com to source playing cards. Then we can generate a deck, and draw 12 cards. Each API response for the drawn cards includes an image we can use in the Card component.

We probably want to fetch the data inside `useEffect` after we set up the state.

State representation:
```js
// App.js
const [cards, setCards] = useState();

const getCards = async () => {
  const deckResponse = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  ).then((response) => response.json());

  let deckID = deckResponse.deck_id;
  const cardsResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=12`
  ).then((response) => response.json());

  setCards(cardsResponse);
}

useEffect(() => {
  getCards();
}, []); // We use the empty array here to run the side effect like a componentDidMount lifecycle
```

I think this should load all the card data into the react component.

I think I'm not using the promise properly, as the cards state array is not set by the time the main component hits it.