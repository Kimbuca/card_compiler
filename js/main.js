const ERR 		= 7,
	  ACPT    	= 8,	// makes a single char token
	  CONT 		= 9,	// ignores
	  SKIP		= 10,	// moves iterator
	  ACCB		= 11, 	// accepts and moves back
	  NOT       = 20;   // placeholder




//map of states
const transition_table = [["1", "2", "3", "4", "5", "5", "0", "7"],  	// initial state or spaces
						  ["1", "7", "0", "0", "0", "0", "0", "7"],		// on letterstate //0 2 
						  ["7", "2", "0", "0", "0", "0", "0", "7"],	
						  ["1", "2", "3", "0", "0", "0", "0", "7"],
						  ["1", "2", "3", "7", "7", "5", "0", "7"],
						  ["7", "2", "7", "7", "7", "0", "0", "7"]];   // NEEDs FIxING

//doing 2 for ind 0 doesnt exists
const accept_states	= 	[ [CONT, CONT, 	ACPT, CONT, CONT, CONT, SKIP, ERR], 	
						  [CONT, ERR, 	ACCB, ACCB, ACCB, ACCB, ACCB, ERR],
						  [ERR,  CONT,	ACCB, ACCB, ACCB, ACCB, ACCB, ERR],
						  [CONT, CONT,  ACPT, ACCB, ACPT, ACCB, SKIP, ERR],				//FIX NUMBER
						  [ACPT, ACCB, 	ACCB, ERR, 	ERR,  ACPT, ACPT,  ERR],
						  [ERR,  CONT,	ERR,  ERR,	ERR,  ACPT, SKIP,  ERR]];





function symbMap(sym){

	if(sym.toUpperCase() != sym.toLowerCase())			//is a letter --> '0' cuz of the column 
 		return 0;
 	else if(sym == "1" || sym == "2" || sym== "3")
		return 1;
	else if(sym == "(" || sym == ")" ||  sym == "{" || sym == "}")
		return 2;
	else if(sym == ">" || sym == "<")
		return 3;
	else if(sym == "!")
		return 4;
	else if(sym == "=")
		return 5;
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
	editor.setValue("c b()");
	
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
			NEXT_STATE 	= transition(CURR_STATE, str.charAt(i)); 				// w/ current state and char: 'where am I going'
 			state = accept_states[CURR_STATE][symbMap(str.charAt(i))];   		// maps in accepted states table to see if it can form a token //2 Y 

 			console.log("I am " +str.charAt(i) +" on state " +CURR_STATE +" looking to GO " +NEXT_STATE);
 			console.log(" MY STATUS is " +state);

			CURR_STATE 	= NEXT_STATE;								// update current state if it was not an error state

			switch(state){

				case ACPT:

					console.log("from " +word_ind +" to " +i);
					var word = str.substring(word_ind, i+1);
					word_ind = i+1;

					this.tokens.push(word);
					break;

				case ACCB:
					//dont move ite
					var word = str.substring(word_ind, i);
					console.log("Acepted word ACCB" +word);
					word_ind=i;				//no la incluye
					i--;

					this.tokens.push(word);
					break;
				case SKIP:
					word_ind++;
					break;

			}
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
    var array =texto.replace(/\n/g, " ").split(" ").join(" ")	;		//everything as a single iterable string

    //lexicography
    var lex = new scanner(array);
    console.log(lex.analyze());	
    console.log(lex.getTokens());

    document.getElementById("demo").innerHTML = array;
}