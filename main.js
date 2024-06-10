const emojis = [
  "🐼",
  "🐤",
  "🦆",
  "🐉",
  "🦕",
  "🦖",
  "🐳",
  "🐬",
  "🐟️",
  "🐠",
  "🐡",
  "🦈",
  "🐙",
  "🦑",
  "🦀",
  "🦞",
  "🦐",
  "🦪",
];

console.log(emojis.length);
// buttons
const btnEasy = document.querySelector(".easy-level");
const btnMedium = document.querySelector(".medium-level");
const btnHard = document.querySelector(".hard-level");

const container = document.querySelector(".container");
const cards = document.querySelector(".cards");
const cardsPicksList = [...emojis, ...emojis];
//const cardsCount = cardsPicksList.length;
//console.log(cardsCount)

let gameOn = false;
let activeCard = null;
let revealedCards = 0;
let awaitngEndOfMove = false;

const buildCard = (emoji, count) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.setAttribute("data-emoji", emoji);
  cardElement.setAttribute("data-revealed", false);

  cardElement.addEventListener("click", () => {
    const revealed = cardElement.getAttribute("data-revealed");
    if (awaitngEndOfMove || revealed === true || cardElement === activeCard) {
      return;
    }
    cardElement.innerHTML = emoji;

    if (!activeCard) {
      activeCard = cardElement;
      return;
    }

    console.log(activeCard);
    const emojiToMatch = activeCard.getAttribute("data-emoji");

    if (
      emojiToMatch.codePointAt(0).toString(16) ==
      emoji.codePointAt(0).toString(16)
    ) {
      // reset data attribute to true
      activeCard.dataset.dataRevealed = true;
      cardElement.dataset.dataRevealed = true;
      activeCard = null;
      awaitngEndOfMove = false;
      revealedCards += 2;

      if (revealedCards === count) {
        alert("You won!");
      }
      return;
    }
    //console.log(emoji.codePointAt(0).toString(16) === emojiToMatch.codePointAt(0).toString(16))

    awaitngEndOfMove = true;

    setTimeout(() => {
      cardElement.innerHTML = null;
      activeCard.innerHTML = null;

      awaitngEndOfMove = false;
      activeCard = null;
    }, 1000);
  });

  return cardElement;
};

const startGame = (level) => {
  const cardsOfEmojies = emojis.slice(0, level);
  const cardsList = [...cardsOfEmojies, ...cardsOfEmojies];
  const cardsCountLevel = cardsList.length;

  for (let i = 0; i < cardsCountLevel; i++) {

    const randomIdx = Math.floor(Math.random() * cardsList.length);
    const emoji = cardsList[randomIdx];

    cardsList.splice(randomIdx, 1);

    const card = buildCard(emoji, cardsCountLevel);
    cards.append(card);

    if (level == 2) {
      cards.style.gridTemplateColumns = "repeat(2, 1fr)";
    }
    if (level == 8) {
      cards.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
    if (level == 18) {
      cards.style.gridTemplateColumns = "repeat(6, 1fr)";
    }
  }
};

//btnEasy.addEventListener("click", startGame(2));
btnMedium.addEventListener('click', startGame(8))
//btnHard.addEventListener('click', startGame(18))
