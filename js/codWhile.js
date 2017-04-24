console.log("Creando nuevo deck");
var MainDeck = new Deck(); //deck 0
var Decks;
var current_card;
var codInt;
var count = 1000;
var isFlipping = false;


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
function initializeDecks (len) {
	return Array.from({ length: len }, () => new Array());
}

function execIntermediateCod(input){

	let i = 0;
	let codInt = input.map(input => parseInt(input));
	Decks = initializeDecks(52);
	runProgram(codInt);

	function runProgram(){

		if(codInt[i]!=END){	
			//debugger;
			console.log("Running.. ", codInt[i]);
			switch(codInt[i]){
				case JUMP:{
					console.log("JUMPING TO.. ", codInt[i+1]);
					i = codInt[++i];
					runProgram();
					break;
				}
				case IF:{
					i++;
					if(runConditional()){
						i = i+3;
					}else{
						i++;
					}
					runProgram();
					break;
				}

				case ISNOTEMPTY:{
					if(runConditional()){
						i = i+3;
					}else{
						i++;
					}
					runProgram();
					break;
				}

				case WHILE: {
					i++;
					runProgram();
					break;
				}

				case GETCARD:{
					var deck = codInt[++i];
					i++;
					console.log("Traer carta de ", deck);
					runGetCard(deck);
					runProgram();
					break;
				}

				case PUTCARD:{
					var deck = codInt[++i];
					console.log("Poner carta en ", deck);
					runPutCard(deck);
					i++;
					setTimeout(runProgram, count);
					break;
				}

				case FLIP:{
					runFlipCard();
					setTimeout(runProgram, 1000);
					break;
				}
			}
			return;
		}else{
			//finish
			//clearInterval(animationTimer);
		}
	}

	function runConditional(){
		switch(codInt[i]){
			case ISNOTEMPTY:{
				var current_deck = codInt[++i];
				return MainDeck.deck.length != 0;
			}
			case ISEMPTY:{
				deck = codInt[++i];
				return actualDecks[deck].size() == 0;
			}
		}
	}

	function runGetCard(deck_num){
		if(deck_num == 0){
			current_card = MainDeck.getCard();
		}else{
			current_card = Decks[deck_num].pop();
		}
	}

	function runPutCard(deck_num){
		if(current_card){
			current_card.put(deck_num);
			Decks[deck_num].push(current_card);
				
		}else{
			throw "There is no card in your hand to put";
		}
	}

	function runFlipCard(){
		if(current_card){
			current_card.show(1);
			setTimeout(() => current_card.flip(), 500);
			//current_card.flip();
			i++;
		}else{
			throw "There is no card in your hand to put";
		}
	}
}