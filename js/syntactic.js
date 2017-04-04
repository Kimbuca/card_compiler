function syntactic_analysis(tokens){

	const palabras_reservadas = ["class", "program", "main", "body", "if", "while", "iterate",
			              					 "else", "void", "number_of_deck", "isRed", "isBlack", "isHeart",
			              					 "isClubs", "isDiamond", "isSpades", "isNotRed", "isNotBlack",
			              					 "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades"];

  const IF 		      = 10,
  		  JUMP 		    = 20,
  		  WHILE 	    = 30,
  		  ITERATE     = 40,
  		  RETURN 	    = 50,
  		  START 	    = 60,
  		  FIN 		    = 70,
  		  CALL 		    = 80,
        CUSTOMER    = 90;

//official functions
  const FLIP        = 91,
        GETCARD     = 92,
        PUTCARD     = 93;


//Conditionals
	const ISEMPTY 		= 100,
		  ISNOTEMPTY 	  = 110,
		  ISBLACK   	  = 130,
		  ISRED     	  = 140,
		  ISHEART   	  = 150,
      ISCLUBS       = 160,
      ISDIAMOND     = 170,
      ISSPADES      = 180,
      ISNOTRED      = 190,
      ISNOTBLACK    = 200,
      ISNOTHEART    = 210,
      ISNOTCLUBS    = 220,
      ISNOTDIAMOND  = 230,
      ISNOTSPADES    = 240;

//Operators
const ISEQUAL          = 300,
			ISNOTEQUAL     = 310,
			LESSTHAN       = 320,
			GREATERTHAN    = 330,
			LESSOREQUAL    = 340,
			GREATEROREQUAL = 350;


	//Guardar tokens para que accedan todos los demas
	var index = 0;
	var codigo_intermedio = [];
	var stack = [];
  var i = 0;


  /**
    Symbol Table Functions
  **/
  var symbolTable = [];

  function addSymbol(symName, pos){
    symbolTable.push({name: symName, position:pos})
  }

  function containsSymbol(symName){
    for(i in symbolTable){
      if(symbolTable[i].name == symName)
        return symbolTable[i].position;
    }
    //addSymbol(str, index);
    return false;
  }

	/**
		Validation Functions
	**/
	function exigir(str){

    console.log("comparing " +tokens[index].token +" AND " +str);
	  if(tokens[index].token == str){
	    index++;
	    return true;
	  };
	  return false;
	}

	function verificar(str){
	  return tokens[index].token == str ? true : false;
	}



  /**
    Program Call
  **/
  try{
    program();
		console.log("CODIGO INTERMEDIO: " + codigo_intermedio);
  } catch (e){
    toastr.error("Error in compilation: Expected " +e +" in line " +tokens[index].line);
  }


  /**
    Syntactic Analysis
  **/
function program(){
	if ( exigir("class") ) {
	  if ( exigir("program") ) {
	    if ( exigir("{") ) {
		   functions();
		   main_function();
	       if (!exigir("}")){
	       		throw "'}'";
	 	   }
      }else {
	    	throw "'{'";
	    }
    }else {
	    	throw "'program'";
	  }
  }else {
	throw "'class'";}
}

function functions(){
	if(verificar("void")){
	 functionSingle();
	}
  functions_alpha();
}

function functions_alpha() {
  if (verificar( "void" )){
    functionSingle();
    functions_alpha();
  }
}

function verificar_number(){
  return !isNaN(tokens[index]);
}

function functionSingle() {
  if ( exigir( "void" ) ) {
    // Aqui va en nombre de la function para hacerla

    codigo_intermedio[i++] = CUSTOMER;
    //foo // 3
    addSymbol(tokens[index].token, i);

    index++;                //move current token position

    if ( exigir("(") ) {
      if ( exigir ( ")" ) ) {
      if ( exigir ( "{"  ) ) {
        body();
        codigo_intermedio[i++] = RETURN;
        if ( !exigir( "}" ) ) {
      throw "'}'";
       }
     } else {
       throw "'{'";
     }
      } else {
      throw "')'";
      }
    } else {
      throw "'('";
    }
  } else {
  throw "'void'";
  }
}

function body(){
  expression();
	body_alpha();
}

function body_alpha(){
  if(verificar("if") | verificar("while") | verificar("iterate") | verificar("flip") | verificar("putCard") | verificar("getCard"))
    expression();
}

function main_function(){
	if(exigir("program")){
		if(exigir("(")){
			if(!exigir(")"))
				throw "')'";
			if(exigir("{")){
				body();
				if(!exigir("}"))
					throw "'}'";
			}else{
				throw "'{'";
			}
		}else
			throw "'('";
	}else
		throw "'program'";
}

function expression(){
  if(verificar("if")){
    if_expression();
  }
  else if(verificar("while")){
    while_expression();
  }else if(verificar("iterate")){
    iterate_expression();
  }else{
    call_function();
  }
}

function call_function(){
  console.log("estoy en call function" +tokens[index].token);
  name_of_function();
}

function name_of_function(){
 if(verificar("flip") | verificar("getCard") | verificar("putCard")){
    official_function();
  }else if(palabras_reservadas.indexOf(tokens[index].token) == -1){
    customer_function();
  }else{
    return;
  }
}

function official_function(){
  if(exigir("flip")){
    if(exigir("(")){
      if(! exigir(")")){
        throw "')'";
      }else{
        codigo_intermedio[i++] = FLIP;
        console.log(codigo_intermedio);
        console.log("Haz un flip");
      }
    }else{
        throw "'('";
    }
  }else if(exigir("getCard") | exigir("putCard")){
    if(exigir("(")){
      if(verificar_number()){
        if(number_of_deck()){
          if(!exigir(")")){
            throw "')'";
          }
        }else{
          throw "'Number between 0 - 52'"
        }
      }else{
        throw "'number'";
      }
    }else{
      throw "'('";
    }
  }else{
    throw "'Function'";
  }
}

function customer_function(){

  var symbol =  tokens[index].token;
  var contains = containsSymbol(symbol);
  if(contains === false){
    throw 'No function specified for ' +tokens[index].token;
  }else{
    codigo_intermedio.push(CALL);
    codigo_intermedio.push(contains);
    i += 2;
    console.log(codigo_intermedio);
    index++;
  }
}

function number_of_deck(){
  return tokens[index] >= 0 && tokens[index] <= 52 ? true : false;
}


function if_expression(){

if(exigir("if")){
	codigo_intermedio[i++] = IF; //0
    if(exigir("(")){
      conditional();
      codigo_intermedio[i++] = ISNOTEMPTY; 	// Verificar condicional despues 1
      if(!exigir(")"))
       	throw "')'";
      if(exigir("{")){
      	codigo_intermedio[i++] = JUMP; 		// agrega el JUMP
      	stack.push(i++) 					// pushea mi posicion actual y queda "reservada", el iterador se mueve con lo que contenga body
        body();
        if(!exigir("}"))
          throw "'}'";
        elseif();
      }else{
        throw "'{'";
      }
    }else{
      throw "'if'";
    }
  }else{
    throw "'if'";
  }
}


function elseif(){

  if(verificar("else")){
    if(exigir("{")){
      codigo_intermedio[i++] = JUMP;     	// JUMP
      codigo_intermedio[stack.pop()] = i+1; // cod[3] = 4    --> usa mi espacio reservado del if para guardar a donde tengo que brincar si es false la condicion
      stack.push(i++);						// stack.push(4) --> reserva mi posicion actual (la pasada) y a continuacion y haz todo lo siguiente
      body();
      if(!exigir("}"))
      	throw "'}'";
      codigo_intermedio[stack.pop()] = i; 	// ahora dile a mi posicion reservada (cod[4]) a donde debe ir en caso de que el elseif sea falso
    }else{
      throw "'{'";
    }
  }else{
  	codigo_intermedio[stack.pop()] = i++;	//si no hubo else o fue falso mi if
  											// solo popea en la posicion reservada y pon a donde brinco despues (siempre es un espacio adelante)
    return;
  }
}


function while_expression(){
	if(exigir("while")){
    stack.push(i);
    codigo_intermedio[i++] = WHILE;
		if(exigir("(")){
			conditional();
			if(!exigir(")"))
				throw "')'";
			if(exigir("{")){
        		codigo_intermedio[i++] = JUMP;
				stack.push(i++);
        		body();
				if(!exigir("}")){
					throw "'}'";
	       		}
		        codigo_intermedio[i++]= JUMP;
		        codigo_intermedio[pop()]= i+1;
		        codigo_intermedio[i++]= pop();
			}else{
				throw "'}'";
			}
		}else{
			throw "'('";
		}
	}else{
		throw "'while'";
	}
}

function iterate_expression(){
  if(exigir("iterate")){
    if(exigir("(")){
      codigo_intermedio[i++] = ITERATE;
      number();

      if(!exigir(")")){
        throw "')'";
      }
      if(exigir("{")){
        begin = i;
        body();
        codigo_intermedio[i++] = JUMP;
        codigo_intermedio[i++] = begin;
        if(!exigir("}")){
          throw "'}'";
        }
      }
    }
  }else {
    throw "'iterate'";
  }
}

function conditional(){
  if(verificar("VALUE")){
    card_composed_conditional();
  }else if(verificar("isEmpty" | "isNotEmpty")){
    deck_simple_condition();
  }else{
    card_simple_condition();
  }
}

function card_simple_condition(){
  if(verificar("isRed")){
    if(exigir("isRed")){
			codigo_intermedio[i++] = ISRED;
    }else{
      throw "'isRed'";
    }
  }else if(verificar("isBlack")){
    if(exigir("isBlack")){
			codigo_intermedio[i++] = ISBLACK;
    }else{
      throw "'isBlack'";
    }
  }else if(verificar("isHeart")){
    if(exigir("isHeart")){
			codigo_intermedio[i++] = ISHEART;
    }else{
      throw "'isHeart'";
    }
  }else if(verificar("isClubs")){
    if(exigir("isClubs")){
			codigo_intermedio[i++] = ISCLUBS;
    }else{
      throw "'isClubs'";
    }
  }else if(verificar("isDiamond")){
    if(exigir("isDiamond")){
			codigo_intermedio[i++] = ISDIAMOND;
    }else{
      throw "'isDiamond'";
    }
  }else if(verificar("isSpades")){
    if(exigir("isSpades")){
			codigo_intermedio[i++] = ISSPADES;
    }else{
      throw "'isSpades'";
    }
  }else if(verificar("isNotRed")){
    if(exigir("isNotRed")){
			codigo_intermedio[i++] = ISNOTRED;
    }else{
      throw "'isNotRed'";
    }
  }else if(verificar("isNotBlack")){
    if(exigir("isNotBlack")){
			codigo_intermedio[i++] = ISNOTBLACK;
    }else{
      throw "'isNotBlack'";
    }
  }else if(verificar("isNotHeart")){
    if(exigir("isNotHeart")){
			codigo_intermedio[i++] = ISNOTHEART;
    }else{
      throw "'isNotHeart'";
    }
  }else if(verificar("isNotClubs")){
    if(exigir("isNotClubs")){
			codigo_intermedio[i++] = ISNOTCLUBS;
    }else{
      throw "'isNotClubs'";
    }
  }else if(verificar("isNotDiamond")){
    if(exigir("isNotDiamond")){
			codigo_intermedio[i++] = ISNOTDIAMOND;
    }else{
      throw "'isNotDiamond'";
    }
  }else if(verificar("isNotSpades")){
    if(exigir("isNotSpades")){
			codigo_intermedio[i++] = ISNOTSPADES;
    }else{
      throw "'isNotSpades'";
    }
  }
}

function card_composed_condition(){
  number()
	operator();
}

function number(){
  console.log("numero " +tokens[index].token);
  if(tokens[index].token >= 0 && tokens[index].token <= 13){
    codigo_intermedio[i++] = parseInt(tokens[index].token);
    index++
    return
  }
  throw 'Number should be between 0 and 13';

}

function operator(){
  if(verificar("<")){
    if(exigir("<")){
			codigo_intermedio[i++] = LESSTHAN;
    }else{
      throw "'<'"
    }
  }else if(verificar(">")){
    if(exigir(">")){
			codigo_intermedio[i++] = GREATERTHAN;
    }else{
      throw "'>'"
    }
  }else if(verificar("<=")){
    if(exigir("<=")){
			codigo_intermedio[i++] = LESSOREQUAL;
    }else{
      throw "'<='"
    }
  }else if(verificar(">=")){
    if(exigir(">=")){
			codigo_intermedio[i++] = GREATEROREQUAL;
    }else{
      throw "'>='"
    }
  }else if(verificar("==")){
    if(exigir("==")){
			codigo_intermedio[i++] = ISEQUAL;
    }else{
      throw "'=='"
    }
  }else if(verificar("!=")){
    if(exigir("!=")){
			codigo_intermedio[i++] = ISNOTEQUAL;
    }else{
      throw "'!='"
    }
  }
}

function deck_simple_condition(){
  if(verificar("isEmpty")){
    if(exigir("isEmpty")){
			codigo_intermedio[i++] = ISEMPTY;
      if(exigir("(")){
        number_of_deck();
        if(!exigir(")")){
          throw "')'";
        }
      }else{
        throw "'('";
      }
    }else{
      throw "'isEmpty'";
    }
  }else{
    if(exigir("isNotEmpty")){
			codigo_intermedio[i++] = ISNOTEMPTY;
      if(exigir("(")){
        number_of_deck();
        if(!exigir(")")){
          throw "')'";
        }
      }else{
        throw "'('";
      }
    }else{
      throw "'isEmpty'";
    }
  }
}

};
