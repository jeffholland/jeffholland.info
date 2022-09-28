const cardArray = [
    {
        name: 'baby',
        img: '../images/lemily/baby.png'
    },
    {
        name: 'beac',
        img: '../images/lemily/beac.png'
    },
    {
        name: 'goat',
        img: '../images/lemily/goat.png'
    },
    {
        name: 'grad',
        img: '../images/lemily/grad.png'
    },
    {
        name: 'harry-elefante',
        img: '../images/lemily/harry-elefante.png'
    },
    {
        name: 'hors',
        img: '../images/lemily/hors.png'
    },
    {
        name: 'mask',
        img: '../images/lemily/mask.png'
    },
    {
        name: 'monk',
        img: '../images/lemily/monk.png'
    },
    {
        name: 'pink',
        img: '../images/lemily/pink.png'
    },
    {
        name: 'stripe',
        img: '../images/lemily/stripe.png'
    },
    {
        name: 'baby',
        img: '../images/lemily/baby.png'
    },
    {
        name: 'beac',
        img: '../images/lemily/beac.png'
    },
    {
        name: 'goat',
        img: '../images/lemily/goat.png'
    },
    {
        name: 'grad',
        img: '../images/lemily/grad.png'
    },
    {
        name: 'harry-elefante',
        img: '../images/lemily/harry-elefante.png'
    },
    {
        name: 'hors',
        img: '../images/lemily/hors.png'
    },
    {
        name: 'mask',
        img: '../images/lemily/mask.png'
    },
    {
        name: 'monk',
        img: '../images/lemily/monk.png'
    },
    {
        name: 'pink',
        img: '../images/lemily/pink.png'
    },
    {
        name: 'stripe',
        img: '../images/lemily/stripe.png'
    }
]

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', '../images/blank.png'); 
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard)
        gridDisplay.append(card);
    }
}

createBoard();

function checkMatch() {
    const cards = document.querySelectorAll("#grid img");
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', '../images/blank.png');
        cards[optionTwoId].setAttribute('src', '../images/blank.png');
        alert("You have clicked the same image!");
    }

    if (cardsChosen[0] === cardsChosen[1]) {
        alert("You found a match!");
        cards[optionOneId].setAttribute('src', '../images/white.png');
        cards[optionTwoId].setAttribute('src', '../images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } 

    else {
        cards[optionOneId].setAttribute('src', '../images/blank.png');
        cards[optionTwoId].setAttribute('src', '../images/blank.png');
        alert("Sorry, try again");
    }

    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length) {
        resultDisplay.innerHTML = "Congratulations! You found them all.";
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    console.log(cardArray[cardId].name);

    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);

    console.log('clicked ' + cardId);
    console.log(cardsChosen);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}