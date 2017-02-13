const ERR 		= 7,	// error
	  ACPT    	= 8,	// makes a single char token
	  CONT 		= 9,	// ignores
	  SKIP		= 10,	// moves iterator
	  ACCB		= 11; 	// accepts and moves back




//map of states
const transition_table = [["1", "2", "3", "4", "5", "5", "0", "7"],  	// initial state or spaces
						  ["1", "7", "0", "0", "0", "0", "0", "7"],		// on letterstate //0 2 
						  ["7", "2", "0", "0", "0", "0", "0", "7"],		// on number
						  ["1", "2", "3", "0", "0", "5", "0", "7"],		// on { ( ) }
						  ["1", "2", "3", "7", "7", "5", "0", "7"],		// on > or <
						  ["7", "2", "7", "7", "7", "0", "0", "7"]];   //  on ! or = or maybe > // needs fixing for when just '=' it accepts it 

//doing 2 for ind 0 doesnt exists
const accept_states	= 	[ [CONT, CONT, 	ACPT, CONT, CONT, CONT, SKIP, ERR], 	
						  [CONT, ERR, 	ACCB, ACCB, ACCB, ACCB, ACCB, ERR],
						  [ERR,  CONT,	ACCB, ACCB, ACCB, ACCB, ACCB, ERR],
						  [CONT, CONT,  ACPT, CONT, ACPT, CONT, SKIP, ERR],				//FIX NUMBER
						  [ACPT, ACCB, 	ACCB, ERR, 	ERR,  ACPT, ACPT, ERR],
						  [ERR,  ACCB,	CONT, ERR,	ERR,  ACPT, SKIP, ERR]];





function symbMap(sym){

	if(sym.toUpperCase() != sym.toLowerCase())							//is a letter 
 		return 0;
 	else if(sym.charCodeAt(0) >= 48 && sym.charCodeAt(0) <= 57)	//is a number
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
	editor.setValue("class program() {}");
	
})();









//This is the lexicography part
function scanner(str){

	this.program = str;
	this.tokens  = [];

	this.getTokens = function(){
		return this.tokens;
	}


	this.addToken = function(start, end){
		var word = str.substring(start, end);
		//console.log("From " +start +" to " +end +" word is: " +word);
		this.tokens.push(word);
	}


	this.analyze = function (){
		var CURR_STATE = i = state = word_ind = 0;					// initializaton;
		var SIZE = this.program.length;
			


		while(state != ERR && i <= SIZE){	

			///console.log(str.charAt(i) +" GO TO " +transition(CURR_STATE, str.charAt(i)));


			//choladas
			NEXT_STATE 	= transition(CURR_STATE, str.charAt(i)); 				// w/ current state and char: 'where am I going next'
 			state = accept_states[CURR_STATE][symbMap(str.charAt(i))];   		// maps in accepted states table to see if it can form a token
 			console.log("I am " +str.charAt(i) +" on state " +CURR_STATE +" looking to GO " +NEXT_STATE);
 			//console.log(" MY STATUS is " +state);

			CURR_STATE 	= NEXT_STATE;								// update current state if it was not an error state

			switch(state){

				case ACPT:
					this.addToken(word_ind, i+1);					// 
					word_ind = i+1;									// mvoes iterator 
					break;

				case ACCB:
					this.addToken(word_ind, i);						//stores in a range and doesnt move iterator
					word_ind=i;								
					i--;											// dont move iterator
					break;

				case SKIP:
					word_ind++;										// move word index 
					break;
			}

			if( i == SIZE)											//								
				return;
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