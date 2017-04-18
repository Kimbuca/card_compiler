//Inicializacion del Programa

int actualDecks = [][]; //Ejemplo: Decks activos al inicio es solo el 1
actualDecks[0] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] //Poner todas las cartas actuales en el deck 0


int i = 0;
int deck;
int card;

while(codInt[i]!=END){

	switch(codInt[i]){
		case JUMP:{
			i++;
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
		case GETCARD:{
			i++;
			deck = codInt[i];
			runGetCard(deck);
			i++;
			break;
		}
		case PUTCARD:{
			i++;
			deck = codInt[i];
			runPutCard(deck);
			i++;
			break;
		}
	}
	
}

function runConditional(){
	switch(codInt[i]){
		case ISNOTEMPTY:{
			i++;
			deck = codInt[i];
			
			return actualDecks[deck].size() != 0 ? true : false;
		}
		case ISEMPTY:{
			i++;
			deck = codInt[i];
			return actualDecks[deck].size() != 0 ? false : true;
		}
	}
}

function runGetCard(int d){
	if(actualDecks[d].ISNOTEMPTY){
		card = actualDecks[d].pop();
	}else{
		throw "The selected Deck is empty";
	}
}

function runputCard(int d){
	if(card){
		actualDecks[d].push(card);
	}else{
		throw "There is no card to put";
	}
}