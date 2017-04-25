function syntactic_analysis(tokens){

	const palabras_reservadas = ["class", "program", "main", "body", "if", "while", "iterate",
			              					 "else", "void", "number_of_deck", "isRed", "isBlack", "isHeart",
			              					 "isClubs", "isDiamond", "isSpades", "isNotRed", "isNotBlack",
			              					 "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades"];

 const  IF          = 100,
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


  var symbolTable = [];

	//Guardar tokens para que accedan todos los demas
	var index = 0;
	var codigo_intermedio = [];
	var stack = [];
  var i = 0;


  /**
    Program Call
  **/
  try{
    program();
    console.log("CODIGO INTERMEDIO: " + codigo_intermedio);
		codigo_intermedio.push(FIN);
    console.log("Symbol Table:");
    console.log(symbolTable.length);
    return codigo_intermedio;

  } catch (e){
    toastr.error("Error in compilation: Expected " +e +" in line " +tokens[index].line);
  }


  /**
    Symbol Table Functions
  **/

  function addSymbol(symName, pos){
    symbolTable.push({name: symName, position:pos})
  }

  function containsSymbol(symName){
    for(j in symbolTable){
      if(symbolTable[j].name == symName)
        return symbolTable[j].position;
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

  function verificarC(){
    console.log("Looking for: " + tokens[index].token);
    console.log("Cantidad de customs: " + symbolTable.length);

    for(j in symbolTable){
      if(tokens[index].token == symbolTable[j].name)
        return true;
    }

    return false;
  }
  /**
    Syntactic Analysis
  **/
function program(){
	if ( exigir("class") ) {
	  if ( exigir("program") ) {
	    if ( exigir("{") ) {
         codigo_intermedio[0] = JUMP;
         codigo_intermedio[1] = 0;
         i = 2;
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
	throw "'class'";
  }
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

  return isNaN(tokens[index]);

}

function functionSingle() {
  if ( exigir( "void" ) ) {
    // Aqui va en nombre de la function para hacerla
    //codigo_intermedio[i++] = CUSTOMER;
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
  if(verificar("if") || verificar("while") || verificar("iterate") || verificar("flip") || verificar("putCard") || verificar("getCard") || verificarC() ){
    expression();
  }else{
    return;
  }
  body_alpha();
}

function main_function(){
	if(exigir("program")){
    //i++;
    codigo_intermedio[1]= i;
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
  }else if(verificar("while")){
    while_expression();
  }else if(verificar("iterate")){
    iterate_expression();
  }else{
    call_function();
  }
}

function call_function(){
  console.log("estoy en call function ->>" +tokens[index].token);
  name_of_function();
}

function name_of_function(){
  if(verificar("flip") || verificar("getCard") || verificar("putCard")){
    official_function();
  }else if(palabras_reservadas.indexOf(tokens[index].token) == -1){
    customer_function();
  }else{
    return;
  }
}

function official_function(){
  if(exigir("flip")){
    codigo_intermedio[i++] = FLIP;
    console.log(codigo_intermedio);
    console.log("Haz un flip");
  }else if(exigir("getCard") || exigir("putCard")){
    if(tokens[index-1].token == "getCard"){
      codigo_intermedio[i++] = GETCARD;
    }else{
      codigo_intermedio[i++] = PUTCARD;
    }
    if(exigir("(")){
      if(verificar_number()){
        if(number_of_deck()){
          codigo_intermedio[i++] = tokens[index].token;
          index++;
          //console.log(codigo_intermedio);
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
  return;
}

function customer_function(){
  var symbol =  tokens[index].token;
  var contains = containsSymbol(symbol);
  if(contains === false){
    throw 'No function specified for ' +tokens[index].token;
  }else{
    codigo_intermedio[i++] = CALL;
    codigo_intermedio[i++] = contains;
    //i += 2;
    console.log(codigo_intermedio);
    index++;
  }
}

function number_of_deck(){
  return tokens[index].token >= 0 && tokens[index].token <= 52 ? true : false;
}


function if_expression(){

if(exigir("if")){
	codigo_intermedio[i++] = IF; //0
    if(exigir("(")){
      conditional();
      //codigo_intermedio[i++] = ISNOTEMPTY; 	// Verificar condicional despues 1
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
		index++;
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
		        codigo_intermedio[stack.pop()]= i+1;
		        codigo_intermedio[i++]= stack.pop();
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
      begin = i;
      codigo_intermedio[i++] = ITERATE;
      number();
      codigo_intermedio[i++] = JUMP;
      stack.push(i++);

      if(!exigir(")")){
        throw "')'";
      }
      if(exigir("{")){
        body();
        codigo_intermedio[i++] = JUMP;
        codigo_intermedio[stack.pop()]= i+1;
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
  }else if(verificar("isEmpty") || verificar("isNotEmpty")){
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
        if(number_of_deck()){
          codigo_intermedio[i++] = tokens[index].token;
          index++;
          if(!exigir(")")){
            throw "')'";
          }
        }else{
          throw "number between 0-52";
        }
      }else{
        throw "'('";
      }
    }else{
      throw "'isEmpty'";
    }
  }else{
    console.log("Got to the deck_simple_condition");
    if(exigir("isNotEmpty")){
			codigo_intermedio[i++] = ISNOTEMPTY;
      if(exigir("(")){
        if(number_of_deck()){
          codigo_intermedio[i++] = tokens[index].token;
          index++;
          if(!exigir(")")){
            throw "')'";
          }
        }else{
          throw "number between 0-52";
        }
      }else{
        throw "'('";
      }
    }else{
      throw "'isNotEmpty'";
    }
  }
}

};
