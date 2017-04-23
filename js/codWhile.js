//var i = 0;
console.log("Creando nuevo deck");
var MainDeck = new Deck(); //deck 0
var Decks = [];  //starts in 1
var current_card;

const 	IF          = 100,
        WHILE       = 110,
        ITERATE     = 120
        RETURN      = 130,
        JUMP        = 160,
        CALL        = 170,
        RET         = 500,
        FIN         = 1000;

//official functions
  const FLIP        = 330,
        GETCARD     = 310,
        PUTCARD     = 320;

//
  const ISEMPTY     = 350,
        ISNOTEMPTY  = 351;


//Conditionals
  const ISBLACK       = 201,
        ISRED         = 202,
        ISHEART       = 203,
        ISCLUBS       = 204,
        ISDIAMOND     = 205,
        ISSPADES      = 206,
        ISNOTRED      = 207,
        ISNOTBLACK    = 208,
        ISNOTHEART    = 209,
        ISNOTCLUBS    = 210,
        ISNOTDIAMOND  = 211,
        ISNOTSPADES   = 212;

//Operators
const LESSTHAN       = 401,
      GREATERTHAN    = 402,
      LESSOREQUAL    = 403,
      GREATEROREQUAL = 404,
      ISEQUAL        = 405,
      ISNOTEQUAL     = 406;

const END = 1000;



//CODIGO INTERMEDIO: 160,2,110,351,0,160,13,310,0,320,2,160,2,1000

//CODIGO INTERMEDIO: 160,2,110,351,0,160,11,310,0,160,2,1000

function execIntermediateCod(input){

	let i = 0;
	let codInt = input.map(cod => parseInt(cod));
	console.log("CODE", codInt);

	while(codInt[i]!=END){	
		//debugger;
		console.log("Running.. ", codInt[i]);
		switch(codInt[i]){
			case JUMP:{
				i++;
				console.log("JUMPING TO.. ", codInt[i]);
				i = codInt[i];
				break;
			}
			case IF:{
				i++;
				//If true en el conditional saltate el jump de salto de todo
				if(runConditional()){
					i = i+3;
				}else{
					i++;
				}
				break;
			}

			case ISNOTEMPTY:{
				if(runConditional()){
					i = i+3;
				}else{
					i++;
				}
				break;
			}

			case WHILE: {
				i++;
				break;
			}

			case GETCARD:{
				i++;
				var deck = codInt[i];
				console.log("Traer carta de ", deck);
				runGetCard(deck);
				i++;
				break;
			}

			/*
			case PUTCARD:{
				var deck = codInt[++i];
				console.log("Poner carta en ", deck);
				runPutCard(deck);
				i++;
				break;
			}*/
		}
	}

	function runConditional(){
		switch(codInt[i]){
			case ISNOTEMPTY:{
				i++;
				var current_deck = codInt[i];
				console.log("is not empty deck: ", current_deck, " ? ");
				console.log(MainDeck.deck.length);
				return MainDeck.deck.length != 0;
				
			}
			case ISEMPTY:{
				i++;
				deck = codInt[i];
				return actualDecks[deck].size() == 0;
			}
		}
	}


	function runGetCard(deck_num){
		console.log("GET CARD", deck_num);

		if(deck_num == 0){
			current_card = MainDeck.getCard();
		}else{
			console.log(Deck[deck_num].length);
			current_card = Decks[deck_num].pop();
		}
	}

	function runPutCard(deck_num){
		if(current_card){
			decks[deck_num] = current_card;
			current_card.putCard(deck_num);
		}else{
			throw "There is no card in your hand to put";
		}
	}
}

