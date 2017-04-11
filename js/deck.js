const suits = [ "hearts", "diams", "clubs", "spades" ];
const ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A" ];

let deck = [];

function Card(suit, rank) {

	this.card = $(".card.template").clone();
	this.card.removeClass("template");
	this.card.find(".rank").html(rank);
  	this.card.find(".suit").html("&"+suit+";");
 
	if( suit === "hearts" || suit === "diams" ) {
	    this.card.addClass("red");
	}

	$(this.card).appendTo("#plot1");

	this.suit = suit,
	this.rank = rank,

	this.put = function(deck){
		var pos = $(`#plot${deck}`).position();

		$(this.card).css("z-index", deck);
  		$(this.card).animate({ 
  			'top': pos.top,
  			'left': pos.left}, 700, function(algo){

  			$(this).appendTo(`#plot${deck}`);
  			$(this).css("left", "initial");
  			$(this).css("top", "initial");

  			console.log("ya termine");
    	});
	}
}

Card.prototype.flip = function() {
	console.log("makig flip");
}

function Deck() {
	deck = [];
	for( var i = 0; i < suits.length; i++ ) {
    	for( var j = 0; j < ranks.length; j++ ) {
			var card = {
				suit: suits[i],
				rank: ranks[j]
			};
      		deck.push(card);
    	}
  	}

  	this.getCard = function() {
  		var card;
  		if( deck.length > 0 ) { 
		    var randIndex = Math.floor( Math.random() * deck.length );
		    card = deck.splice( randIndex, 1 )[0];
	  	}
	  	if(!card){
	  		resetCanvas();
	  	}

  		return new Card(card.suit, card.rank);
  	};
};

var myDeck = new Deck();
var i = 1;
$("#reset-button").click(function () {
		var card = myDeck.getCard();
		card.put(++i);
	}
);