var MainDeck = new Deck(); //deck 0
var Decks;
var current_card;
var codInt;
var count = 1000;
var isFlipping = false;

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

		if(codInt[i]!=Keys.END){	
			//debugger;
			if(codInt[i] == undefined){
				i++;
				runProgram()
			}

			console.log("Running.. ", codInt[i]);
			switch(codInt[i]){
				case Keys.JUMP:{
					console.log("JUMPING TO.. ", codInt[i+1]);
					i = codInt[++i];
					runProgram();
					break;
				}
				case Keys.IF:{
					i++;
					if(runConditional()){
						i = i+3;
					}else{
						i++;
					}
					runProgram();
					break;
				}

				case Keys.ISNOTEMPTY:{
					if(runConditional()){
						i = i+3;
					}else{
						i++;
					}
					runProgram();
					break;
				}

				case Keys.WHILE: {
					i++;
					runProgram();
					break;
				}

				case Keys.GETCARD:{
					var deck = codInt[++i];
					i++;
					console.log("Traer carta de ", deck);
					runGetCard(deck);
					runProgram();
					break;
				}

				case Keys.PUTCARD:{
					var deck = codInt[++i];
					console.log("Poner carta en ", deck);
					runPutCard(deck);
					i++;
					setTimeout(runProgram, count);
					break;
				}

				case Keys.FLIP:{
					runFlipCard();
					setTimeout(runProgram, 1000);
					break;
				}

				case Keys.ISBLACK:{
					console.log("Carta ",i  ,"es negra?");
					if(runConditional()){
						i = i+2;
					}else{
						i++;
					}
					runProgram();
					break;
				}

				case Keys.ISRED: {
					if(runConditional()){
						i = i+2;
					}else{
						current_card = 
						i++;
					}
					runProgram();
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
			case Keys.ISNOTEMPTY:{
				var current_deck = codInt[++i];
				return MainDeck.deck.length != 0;
			}
			case Keys.ISEMPTY:{
				deck = codInt[++i];
				return actualDecks[deck].size() == 0;
			}
			case Keys.ISBLACK:{
				i++;
				if(current_card.suit == "clubs" || current_card.suit == "spades"){
					return true;
				}
				return false;
			} 
			case Keys.ISRED:{
				i++;
				if(current_card.suit == "hearts" || current_card.suit == "diams"){
					return true;
				}
				return false;
			}
			case Keys.ISHEART:{
				i++;
				return current_card == "hearts";
			}
			case Keys.ISCLUBS:{
				i++;
				return current_card == "clubs";
			}
			case Keys.ISDIAMOND:{
				i++;
				return current_card == "diams";
			}
			case Keys.ISSPADES:{
				i++;
				return current_card == "spades";
			}
			case Keys.ISNOTHEART:{
				i++;
				return !(current_card == "hearts");
			}
			case Keys.ISNOTCLUBS:{
				i++;
				return !(current_card == "clubs");
			}
			case Keys.ISNOTDIAMOND: {
				i++;
				return !(current_card == "diams");
			}
			case Keys.ISNOTSPADES: {
				i++;
				return !(current_card == "spades");
			}
			default:{
				composed_condition();
			}
		}
	}

	function composed_condition(){
		var num1 = codInt[i];
		var num2 =0;
		i++;
		switch(codInt[i]){
			case Keys.LESSTHAN:{
				i++;
				num2 = codInt[i];
				i++;
				return num1 < num2;
			}
			case Keys.GREATERTHAN: {
				i++;
				num2= codInt[i];
				i++;
				return num1 > num2;
			}
			case Keys.LESSOREQUAL:{
				i++;
				num2= codInt[i];
				i++;
				return num1 <= num2;
			}
			case Keys.GREATEROREQUAL:{
				i++;
				num2= codInt[i];
				return num1 >= num2;
			}
			case Keys.ISEQUAL:{
				i++;
				num2= codInt[i];
				i++;
				return num1 == num2;
			}
			case Keys.ISNOTEQUAL:{
				i++;
				num2= codInt[i];
				return num1 != num2;
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
			i++;
		}else{
			throw "There is no card in your hand to put";
		}
	}
}