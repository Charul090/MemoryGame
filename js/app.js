/*
 * Create a list that holds all of your cards
 */
 //@description To store list of cards in variable
let cardList = document.getElementsByClassName('card');
let cards=[...cardList];

//@description To store deck of cards in a variable
let deck=document.querySelector('.deck')

//@description list for all open cards
let open=[];

//@description Counting number of Moves
let count=0;
//@description Accessing element that displays number of moves made by user
let moves=document.querySelector('.moves');

//@description Reset button
let restart=document.querySelector('.restart');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//@description Shuffles card every time page is loaded and refreshed
document.body.onload=start();

//@description Cards shuffling logic
function start(){
  shuffle(cards);
  for(i=0;i<cards.length;i++){
    const q =cards[i].classList;
    q.remove('match','show','open');
    deck.appendChild(cards[i]);
  }
  count=0;
  moves.textContent=count;
}

//@description Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//@description Eventlistener for card
deck.addEventListener('click', openCard);


//@Opening card logic
function openCard(event){
  let ab=event.target;
  if((ab.nodeName ==='LI')&&(open.length<2)&&(!open.includes(ab))){
    ab.classList.add('open','show');
    open.push(ab);
    countMoves();
  }
  if(open.length===2){
    cardMatch();
  }

}

//@description If cards match or not
function cardMatch(){
  const ac=open[0].firstElementChild;
  const ab=open[1].firstElementChild;
  if(ac.className === ab.className){
    open[0].classList.add('match');
    open[1].classList.add('match');
    open=[];
  }
  else {
    open[0].classList.remove('match','show','open');
    open[1].classList.remove('match','show','open');
    open=[];
  }
}

function countMoves(){
  count++;
  moves.textContent=count;
}

//@description Reset button
restart.addEventListener('click',function(){
  start();
  count=0;
  open=[];
});
