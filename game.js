const cardsColor = ["violet", "violet", "blue", "blue", "indigo","indigo",
"green", "green", "yellow", "yellow", "orange", "orange","red", "red", "pink","pink", "salmon",
"salmon"] // holds different colours, twice, since we need pairs 

let cards = document.querySelectorAll("div"); //selects all "div" elements
cards = [... cards]; // creates an array 

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];
const gamePairs = cards.length/2; // this is a number of pairs - 18 divs/cards 
let gameResult = 0;

const clickCard = function(){            
	activeCard = this;                // the card we are clicking on
	if(activeCard == activeCards[0]) return; // disables click twice on the samae card 
	activeCard.classList.remove("hidden"); // removes the class "hidden" which gives it black color
	//is this the first click 
	if (activeCards.length === 0) {
		activeCards[0] = activeCard;
		return;
	} 
	//if this the second click, disable further clicks, until .off class is active
	 else {
	 	cards.forEach(card=>{
	 		card.removeEventListener("click", clickCard)
	 	})
	 	activeCards[1] = activeCard;
	 	// timeout so that the second click shows the card before adding class 
setTimeout(function(){
	
	     if(activeCards[0].className === activeCards[1].className){
	 		activeCards.forEach(card=> card.classList.add("off"));
	 		gameResult ++; // accumulates the result of found pairs

	 		  cards = cards.filter(card =>!card.classList.contains("off"));// takes out the pairs of the list, so that clicking on them has no effect

	 		if (gameResult === gamePairs) // this means a win 
	 		{
	 			const endTime = new Date().getTime();
	 			const gameTime = (endTime - startTime) / 1000;
	 			alert(`Congratulations, you are a WINNER!!! Your time: ${gameTime} seconds.`);
	 			location.reload();
	 		}
	 	}
	 	else {
	 	  activeCards.forEach(card=> card.classList.add("hidden"));

	 	}
	 	activeCard = ""; // empty  
	 	activeCards.length = 0; // first click again
	 	cards.forEach(card => card.addEventListener("click", clickCard))
},500)

	 	
	 }



}
const init = function(){
	cards.forEach(function (card){
		const position = Math.floor(Math.random()* cardsColor.length); // finds random index of colours array 
        card.classList.add(cardsColor[position]); 
        cardsColor.splice(position, 1); //takes a colour out of the array, since we can only click 2x on the same one. 
	})

	setTimeout(function(){
		cards.forEach(card=>{
        card.classList.add("hidden")
        card.addEventListener("click" , clickCard)
		})
	}, 2000)
};

init();