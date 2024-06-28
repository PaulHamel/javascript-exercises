
let dealerSum = 0;
let playerSum = 0;

// let dealerAceCount = 0;
// let playerAceCount = 0;

// let hidden;
let deck;


let dealerHand = [];
let playerHand = [];

//Trying both ways -- Assuming they are the same
// const playerHandDiv = document.querySelector('#player-hand');
const playerHandDiv = document.getElementById('player-cards');
const dealerHandDiv = document.getElementById('dealer-cards');

const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

const playerTotal = document.getElementById('player-sum');
const dealerTotal = document.getElementById('dealer-sum');

let numberOfDecks = 1; //Will be variable later on

window.onload = function(){
    buildDeck();
    playHand();


}

function buildDeck(){
    let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; //Maybe research enums later on and convert these?
    let suits = ['H','D','C','S'];

    deck = [];

    for(let n = 0; n < numberOfDecks; n++){
        for(let i = 0; i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                deck.push(values[i] + '-' + suits[j]);
            }
        }
    }
    shuffleDeck();
}


function shuffleDeck(){
    for(let n = 0; n < 3; n++){
        for(let i = 0; i < deck.length; i++){
            let randomIdx = Math.floor(Math.random() * deck.length);
            let temp = deck[i];
            deck[i] = deck[randomIdx];
            deck[randomIdx] = temp;
        }
    }

}

function dealCard(){
    return deck.pop();
}

function getCardValue(card){
    let value = card.split('-')[0];
    if(value === 'J' || value === 'Q' || value === 'K'){
        return 10;
    } else if(value === 'A'){
        return 11;
    } else {
        return parseInt(value);
    }

}

function getHandValue(hand){
    //Hand in an array of Cards
    let sum = 0;
    let aceCount = 0;
    let tempCardValue = 0;

    hand.forEach(element => {
        tempCardValue = getCardValue(element);
        if(tempCardValue === 11){
            aceCount++;
        }
        sum += tempCardValue;
        
    });

    for(let i = 0; i < aceCount; i++){
        if(sum > 21){
            sum -= 10;
        }
    }

    return sum;
}

function displayCard(cardName, div){
    let img = document.createElement('img');
    img.src = `./cards/${cardName}.png`;
    div.appendChild(img);
}

function dealInitialCards(){
    for(let i = 0; i < 2; i++){
        playerHand.push(dealCard());
        displayCard(playerHand[playerHand.length - 1], playerHandDiv);
        dealerHand.push(dealCard());

        if(i == 0){
            displayCard("BACK", dealerHandDiv);
        }else{
            displayCard(dealerHand[dealerHand.length - 1], dealerHandDiv);
        }
        
    }

    playerSum = getHandValue(playerHand);
    dealerSum = getHandValue(dealerHand);

}

function playerCanHit(){
    // Under 21, not busted, dealer doesn't have blackjack
    return playerSum < 21 && 21 > playerSum && dealerSum < 21;
}

function dealerCanHit(){
    return dealerSum < 17;
}

function playerHit(){
    playerHand.push(dealCard());
    displayCard(playerHand[playerHand.length - 1], playerHandDiv);
    playerSum = getHandValue(playerHand);
}

function dealerHit(){
    dealerHand.push(dealCard());
    displayCard(dealerHand[dealerHand.length - 1], dealerHandDiv);
    dealerSum = getHandValue(dealerHand);
}

function playHand(){
    // Check the length of the deck, if need be, shuffle the deck
    // if(deck.length < 10){
    //     buildDeck();
    //     shuffleDeck();
    // }
    let handOver = false;

    dealInitialCards();

    while (playerCanHit()) {
        hitButton.addEventListener('click', function(){
            if(playerCanHit()){
                playerHit();

                if(playerSum > 21){
                    //endHand();
                    handOver = true;
                }
            }
        });

        standButton.addEventListener('click', function(){
            handOver = true;//endHand();
        });

        // Add event listener for standButton
        // ...

        // Wait for button clicks
    }

    if(handOver && playerSum <= 21){
        endHand();
    }

    // Rest of the code after player stops hitting
}

function playerDealerHand(){
    while(dealerCanHit()){
        dealerHit();
    }
}

function endHand(){
    playerDealerHand();
    //print the results and whatnot
    playerTotal.textContent = playerSum;
    dealerTotal.textContent = dealerSum;
}

function cleanUpHand(){
    // Delete all the cards in both divs
    // Reset all the variables
    dealerSum = 0;
    playerSum = 0;
    dealerHand = [];
    playerHand = [];

    //Reset the divs by manually deleting all the children that are imgs
    // while(playerHandDiv.firstChild instanceof HTMLImageElement){
    //     if (playerHandDiv.firstChild instanceof HTMLImageElement) {
    //         playerHandDiv.removeChild(playerHandDiv.firstChild);
    //     }
    // }

    // while(dealerHandDiv.firstChild instanceof HTMLImageElement){
    //     if (dealerHandDiv.firstChild instanceof HTMLImageElement) {
    //         dealerHandDiv.removeChild(dealerHandDiv.firstChild);
    //     }
    // }

    while(playerHandDiv.firstChild){
        playerHandDiv.removeChild(playerHandDiv.firstChild);
    }
    while(dealerHandDiv.firstChild){
        dealerHandDiv.removeChild(dealerHandDiv.firstChild);
    }
    
}