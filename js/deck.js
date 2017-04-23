const suits = [ "hearts", "diams", "clubs", "spades" ];
const ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A" ];

function Card(suit, rank) {

	this.card = $(".card.template").clone();
	this.card.removeClass("template");
	this.card.find(".rank").html(rank);
  	this.card.find(".suit").html("&"+suit+";");
  	this.card.flip({//trigger: 'manual'
  	});
 
	if( suit === "hearts" || suit === "diams" ) {
	    this.card.addClass("red");
	}else{
		this.card.addClass("black");
	}

	$(this.card).appendTo("#plot1");

	this.suit = suit,
	this.rank = rank,

	this.put = function(deck){
		let pos = $(`#plot${deck}`).position();
		let parentDeckPos = this.card.parent().position();
		let self = this;

		$(this.card).css("z-index", deck);
		$(this.card).css("top", parentDeckPos.top);
		$(this.card).css("left", parentDeckPos.left);

  		$(this.card).animate({ 
  			'top': pos.top,
  			'left': pos.left
  		}, 800, function() {

  			$(this).appendTo(`#plot${deck}`);
  			setTimeout(() => self.flip(), 250);
    	});
	}

	this.flip = function(){
		this.card.flip('toggle');
	}
}


function Deck() {
	this.deck = [];
	for( var i = 0; i < suits.length; i++ ) {
    	for( var j = 0; j < ranks.length; j++ ) {
			var card = {
				suit: suits[i],
				rank: ranks[j]
			};
      		this.deck.push(card);
    	}
  	}

  	this.getCard = function() {
  		var card;
  		if( this.deck.length > 0 ) { 
		    var randIndex = Math.floor( Math.random() * this.deck.length );
		    card = this.deck.splice( randIndex, 1 )[0];
	  	}
	  	/*
	  	if(!card){
	  		resetCanvas();
	  	}*/

  		return new Card(card.suit, card.rank);
  	};
};

var myDeck = new Deck();
var i = 1;
$("#reset-button").click(function () {
		var card = myDeck.getCard();
		card.put(++i);
		//setTimeout(() => card.put(++i), 1000);
	}
);