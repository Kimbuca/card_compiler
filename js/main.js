const ERR = 7,
	  ACPT    	= 8,	// makes token
	  CONT 		= 9,	// ignores
	  SKIP		= 10,	// moves iterator
	  NOT       = 20;   // placeholder




//map of states
const transition_table = [["1", "2", "3", "4", "5", "5", "6", "7"],  	// initial state or spaces
						  ["1", "6", "3", "4", "5", "5", "6", "7"],		// on letterstate
						  ["1", "2", "3", "4", "5", "5", "6", "7"],	
						  ["1", "2", "3", "4", "5", "5", "6", "7"],		
						  ["1", "2", "3", "7", "7", "0", "6", "7"],
						  ["7", "7", "7", "7", "7", "0", "7", "7"],
						  ["1", "2", "3", "4", "5", "5", "6", "7"] ];   // spaces

//doing 2 for ind 0 doesnt exists
const accept_states	= 	[ [CONT,CONT, CONT, CONT, CONT, CONT, CONT, ERR], 	
						  [NOT, CONT, ERR, 	ACPT, ACPT, ACPT, ACPT, ACPT, ERR],
						  [NOT, ERR,  CONT,	ACPT, ACPT, ACPT, ACPT, ACPT, ERR],
						  [NOT, ACPT, ACPT, ACPT, ACPT, ACPT, ACPT, ACPT, ERR],
						  [NOT, ],
						  [NOT],
						  [NOT, SKIP, SKIP,	SKIP,	SKIP, 	SKIP,	SKIP,	ERR]];





function symbMap(sym){

	if(sym.toUpperCase() != sym.toLowerCase())			//is a letter --> '0' cuz of the column 
 		return 0;
 	else if(sym == ("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"))
		return 1;
	else if(sym == "(" || sym == ")" ||  sym == "{" || sym == "}")
		return 2;
	else if(sym == " ")
		return 6;
	else
		return 7;
}




function transition(state, char){
	//return the next transition
	return transition_table[state][symbMap(char)];
}



/* ...:::::PUNTOS EXTRA:::::...
	
	insensible a espacios 
	automata para el lexico (doing...)

	usar un editor 
	en que linea la rego

	mostrar stack de errores que no solo se rompa

	...:::::LINEAMIENTOS:::::...
	
	LEXICOGRAFICO
	insensible a mayusculas 
	identificadores sin numeros
	mandar error cuando hay error de escritura


*/

var editor;
(function editorSetup() {
	editor = ace.edit("editor");
	editor.resize(true);

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
	editor.getSession().setTabSize(3);
	editor.setValue("class program() { ");
	
})();









//This is the lexicography part
function scanner(str){

	this.program = str;
	this.tokens  = [];

	this.getTokens = function(){
		return this.tokens;
	}

	this.analyze = function (){
		var CURR_STATE = 0; // initial state
		var i 	  = 0;
		var state = 0;
		var word_ind = 0;
		var SIZE = this.program.length;
			


		while(state != ERR && i <= SIZE){	

			///console.log(str.charAt(i) +" GO TO " +transition(CURR_STATE, str.charAt(i)));

			//choladas
			NEXT_STATE 	= transition(CURR_STATE, str.charAt(i)); 	// w/ current state and char: 'where am I going'
 			state = accept_states[CURR_STATE][NEXT_STATE];   		// maps in accepted states table to see if it can form a token

 			console.log("I am " +str.charAt(i) +" on state " +CURR_STATE +" looking to do " +NEXT_STATE);
 			console.log(" MY STATUS is " +state);

			CURR_STATE 	= NEXT_STATE;								// update current state if it was not an error state





			if(state==ACPT){
				var word = str.substring(word_ind, i);
				console.log("Acepted word" +word.toString());
				word_ind = i;
				this.tokens.push(word);

			}

			if(state == SKIP)
				word_ind++;

			if( i == SIZE)
				return "SUCESS"

			i++;
		}
		
		return "Error UNEXPECTED CHAR" +str.charAt(i);
	};
}
//returns the data structure containing all the tokens





function myFunction() {


	//preprocess program
    var texto = editor.getValue();
    var array = texto.replace(/\n/g, " ").split(" ").join(" ");		//everything as a single iterable string

    //lexicography
    var lex = new scanner(array);
    console.log(lex.analyze());	
    console.log(lex.getTokens());

    document.getElementById("demo").innerHTML = array;
}