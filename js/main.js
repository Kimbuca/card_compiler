//map of states
const transition_table = [];
const accept_states	= [];
const ERR_STATE = 6;


/* ...:::::PUNTOS EXTRA:::::...
	
	insensible a espacios 
	automata para el lexico (doing...)

	...:::::LINEAMIENTOS:::::...
	insensible a mayuscula

*/


//This is the lexicography part
function scanner(str){

	this.program = str;

	this.analyze = function (){
		var state = 0; // initial state
		var i 	  = 0;

		while(state != ERR_STATE && i < this.program.length){	

			//keep track of automate state depeding of the symbol (doing...)
			console.log(str.charAt(i));
			i++;
			//map token as identifier, symbol or expression
			//substring useful to divide str.substring(1,4) -> one to 4 as we are treating a whole string
		}
		
		return "MAP DE TOKENSSS";
	};
}
//returns the data structure w/ the mapping of the type of token --> map(type, value)


function myFunction() {


	//preprocess program
    var texto = document.getElementById("exampleTextarea").value;
    var array = texto.replace(/\n/g, " ").split(" ").join("");		//everything as a single iterable string

    var lex = new scanner(array);
    var tokens 	= lex.analyze(); 	
    console.log(tokens);

    document.getElementById("demo").innerHTML = array;
}