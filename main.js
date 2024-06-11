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

// console.log(emojis.length);

// buttons
const btnEasy = document.querySelector(".easy-level");
const btnMedium = document.querySelector(".medium-level");
const btnHard = document.querySelector(".hard-level");
const restartBtn = document.querySelector(".btn-cta");

const cards = document.querySelector(".cards");
//const cardsPicksList = [...emojis, ...emojis];
let currentLevel = null;

let activeCard = null;
let revealedCards = 0;
let awaitngEndOfMove = false;

// creates a card
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
        modal();
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

// starts the game
const startGame = (level) => {
  currentLevel = level;
  const cardsOfEmojies = emojis.slice(0, level);
  const cardsList = [...cardsOfEmojies, ...cardsOfEmojies];
  const cardsCountLevel = cardsList.length;
  console.log(currentLevel);

  for (let i = 0; i < cardsCountLevel; i++) {
    const randomIdx = Math.floor(Math.random() * cardsList.length);
    const emoji = cardsList[randomIdx];

    cardsList.splice(randomIdx, 1);

    const card = buildCard(emoji, cardsCountLevel);
    cards.append(card);

    // sets the grid for styling
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

// Select the level
btnEasy.addEventListener("click", () => {
  cards.innerHTML = "";
  startGame(2);
});
btnMedium.addEventListener("click", () => {
  cards.innerHTML = "";
  startGame(8);
});
btnHard.addEventListener("click", () => {
  cards.innerHTML = "";
  startGame(18);
});

// refresh button
restartBtn.addEventListener("click", () => {
  // if (currentLevel == 2) {
  //   cards.innerHTML = "";
  //   startGame(2);
  // } else if (currentLevel == 8) {
  //   cards.innerHTML = "";
  //   startGame(8);
  // } else {
  //   cards.innerHTML = "";
  //   startGame(18);
  // }
  window.location.reload();
});

// Modal

const modal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const p = document.createElement("p");
  p.classList.add("modal-text");
  p.innerText = "Congratulation! You won this game! 👍";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("btn");
  closeBtn.innerText = "close";

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hide");
  });
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  modalContent.appendChild(p);
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};
