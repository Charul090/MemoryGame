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
//@description list for all matched cards
let disabled=[];
//@description Counting number of Moves
let count=0;
//@description Accessing element that displays number of moves made by user
let moves=document.querySelector('.moves');

//@description Reset button
let restart=document.querySelector('.restart');

//@description Number cards matched
let matched=0;

//@description To access popup
let pop = document.getElementById('pop');

//@description To access x that closes the popup
let close = document.querySelector('.close');
//@description Accessing elemtent to display moves in POPUP
let movess=document.querySelector('.moves-2');
//@description Accessing star class
let star=document.querySelectorAll('.fa-star');
let starz=document.querySelector('.starz');
let stars=document.querySelector('.stars');
//@description variables for TIMER
let second = 0
let minute = 0
let hour = 0;
let time = document.querySelector('.time');
let interval;
let timess=document.querySelector('.timess')


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
		q.remove('match','show','open','flip','zoom','shake');
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
	if((ab.nodeName ==='LI')&&(open.length<2)&&(!open.includes(ab))&&(!disabled.includes(ab))){
		ab.classList.add('open','show');
		open.push(ab);
		countMoves();
	}
	if(open.length===1) {
		open[0].classList.toggle('flip');
	}
	if(open.length===2){
		setTimeout(cardMatch,250);
	}

}

//@description If cards matches or not checking functionality
function cardMatch(){
	if(open[0].firstElementChild.className === open[1].firstElementChild.className) {
		open[0].classList.add('match','zoom');
		open[1].classList.add('match','zoom');
		disabled.push(open[0]);
		disabled.push(open[1]);
		open=[];
		matched+=1;
		if(matched===8){
			clearInterval(interval);
			congrats();
		}
	}
	else {
		open[0].classList.remove('flip');
		open[0].classList.add('shake');
		open[1].classList.add('shake');
		setTimeout(cardMismatch,1000);

	}
}
//@description To animate mismatched cards
function cardMismatch(){
open[0].classList.remove('match','show','open');
open[1].classList.remove('match','show','open');
open[0].classList.remove('shake','flip');
open[1].classList.remove('shake','flip');
open=[];
}
//function for number of moves and rating based on number of moves
function countMoves(){
	count++;
	if(count===2){
	startTimer();
	}
	starRating();
	moves.textContent=count;
}

//Rating based on moves
function starRating(){
if(count<=26){
	star[0].style.color="rgb(255, 168, 0)";
	star[1].style.color="rgb(255, 168, 0)";
	star[2].style.color="rgb(255, 168, 0)";
}
else if(27<count && count<=33){
	star[0].style.color="rgb(255, 168, 0)";
	star[1].style.color="rgb(255, 168, 0)";
	star[2].style.color="#000000";
}
else if(34<=count && count<=38){
	star[0].style.color="rgb(255, 168, 0)";
	star[1].style.color="#000000";
	star[2].style.color="#000000";
}
else{
	zeroRating();
}
}

//@description Zero stars function
function zeroRating()
{
	star[0].style.color="#000000";
	star[1].style.color="#000000";
	star[2].style.color="#000000";
}

//@description Reset button
restart.addEventListener('click',resetGame);
function resetGame(){
	start();
	count=0;
	open=[];
	matched=0;
	zeroRating();
	resetTimer();
}

//@description Congratulations pop up
function congrats(){
		pop.style.display = "block";
		movess.textContent=count;
		timess.textContent=time.innerHTML;
		if(count<=26){
			starz.innerHTML=stars.firstElementChild.innerHTML+stars.firstElementChild.innerHTML+stars.firstElementChild.innerHTML;
		}
		else if(27<count && count<=33){
			starz.innerHTML=stars.firstElementChild.innerHTML+stars.firstElementChild.innerHTML;
		}
		else if(34<=count && count<=38){
			starz.innerHTML=stars.firstElementChild.innerHTML;
		}
		else{
			starz.innerHTML="";
		}
}
// When the user clicks on x, close the popup
close.addEventListener('click',function(){
		pop.style.display = "none";
})

//Functionality for playagain in pop-up
document.querySelector('.popup-footer').addEventListener('click',function(){
	resetGame();
	pop.style.display = "none";
})

// @description function for starting tIMER
function startTimer(){
		interval = setInterval(function(){
				time.innerHTML = minute+":"+second ;
				second++;
				if(second == 60){
						minute++;
						second=0;
				}
				if(minute == 60){
						hour++;
						minute = 0;
				}
		},1000);
}
// @description function for reseting tIMER
function resetTimer(){
	clearInterval(interval);
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
		time.innerHTML = "";
}
