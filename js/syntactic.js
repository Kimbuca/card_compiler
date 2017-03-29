
/**
	Main Method
**/
function syntactic_analysis(tokens){

	const palabras_reservadas = ["class", "program", "main", "body", "if", "while", "iterate",
			              "else", "void", "number_of_deck", "isRed", "isBlack", "isHeart",
			              "isclubs", "isDiamond", "isSpades", "isNotRed", "isNotBlack", 
			              "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades"];

	const IF 		= 10,
		  JUMP 		= 20,
		  WHILE 	= 30,
		  ITERATE = 40,
		  RETURN 	= 50,
		  START 	= 60,
		  FIN 		= 70,
		  CALL 		= 80;



	const ISEMPTY 		= 100,
		  ISNOTEMPTY 	= 110,
		  ISBLACK   	= 130,
		  ISRED     	= 140,
		  ISHEART   	= 150;


	//Guardar tokens para que accedan todos los demas
	var index = 0;
	var codigo_intermedio = [];
	var stack = [];
	var i 	  = 0;

  var symbolTable = [];


  function addSymbol(symName, pos){
    symbolTable.push({name: symName, position:pos})
  }

  //aid method to check if symbol is in table and returns position
  function containsSymbol(symName){
    for(i in symbolTable){
      if(symbolTable[i].name == symName)
        return symbolTable[i].position;
    }
    return false
  }

	/**
		Validation Functions
	**/
	function exigir(str){
  addSymbol(str, index);
	  if(tokens[index] == str){
	    index++;
	    return true;
	  };
	  return false;
	}


	function verificar(str){
	  return tokens[index] == str ? true : false;
	}

	console.log(tokens);

  try{
    program();
  } catch (e){
    toastr.error("Error in compilation: Expected " + e);
    console.log(symbolTable);
  }

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
	 functions_alpha();
	}
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
    // Aqui va en nombre de la function para hacerla void FA(){}
    name_function();
    if ( exigir( "(" ) ) {
      if ( exigir ( ")" ) ) {
      if ( exigir ( "{"  ) ) {
        body();
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
	body_alpha();  
	expression();
}

function body_alpha(){
  if ( verificar ("void")){
     //expression();
     body_alpha();
  }
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
  name_of_function();
}

function name_of_function(){
  if(verificar("flip") | verificar("getCard") | verificar("putCard")){
    official_function();
  }else{
    customer_function();
  }
}

function official_function(){
  if(exigir("flip")){
    if(exigir("(")){
      if(! exigir(")")){
        throw "')'";
      }else{
        flip();
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
  if(palabras_reservadas.indexOf(tokens[index]) > -1){
    index++;
    if(exigir("(")){
      if(!exigir(")")){
        throw "')'";
      }
    }else{
      throw "'('";
    }
  }else{
    throw "'Function'";
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
  if(exigir("for")){
    codigo_intermedio[i++] = 40;
    if(exigir("(")){
      stack.push(i);
      conditional();
      if(!exigir(")")){
        throw "')'";
      }
      if(exigir("{")){
        codigo_intermedio[i++] = JUMP;
        stack.push(i++);
        body();
        if(!exigir("}")){
          throw "'}'";
        }
        codigo_intermedio[i++]= JUMP;
        codigo_intermedio[stack.pop()]= i+1;
        codigo_intermedio[i++] = stack.pop();
      }
    }
  }else {
    throw "'iterate'";
  }
}

function conditional(){
  if(verificar("VALUE")){
    card_composed_conditional();
  }else if(verificar("isEmpty")){
    deck_simple_condition();
  }else{
    card_simple_condition();
  }
}

function card_simple_condition(){
  if(verificar("isRed")){
    if(exigir("isRed")){

    }else{
      throw "'isRed'";
    }
  }else if(verificar("isBlack")){
    if(exigir("isBlack")){

    }else{
      throw "'isBlack'";
    }
  }else if(verificar("isHeart")){
    if(exigir("isHeart")){

    }else{
      throw "'isHeart'";
    }
  }else if(verificar("isClubs")){
    if(exigir("isClubs")){

    }else{
      throw "'isClubs'";
    }
  }else if(verificar("isDiamond")){
    if(exigir("isDiamond")){

    }else{
      throw "'isDiamond'";
    }
  }else if(verificar("isSpades")){
    if(exigir("isSpades")){

    }else{
      throw "'isSpades'";
    }
  }else if(verificar("isNotRed")){
    if(exigir("isNotRed")){

    }else{
      throw "'isNotRed'";
    }
  }else if(verificar("isNotBlack")){
    if(exigir("isNotBlack")){

    }else{
      throw "'isNotBlack'";
    }
  }else if(verificar("isNotHeart")){
    if(exigir("isNotHeart")){

    }else{
      throw "'isNotHeart'";
    }
  }else if(verificar("isNotClubs")){
    if(exigir("isNotClubs")){

    }else{
      throw "'isNotClubs'";
    }
  }else if(verificar("isNotDiamond")){
    if(exigir("isNotDiamond")){

    }else{
      throw "'isNotDiamond'";
    }
  }else if(verificar("isNotSpades")){
    if(exigir("isNotSpades")){

    }else{
      throw "'isNotSpades'";
    }
  }
}

function card_composed_condition(){
  if(exigir("VALUE")){
    operator();
  }else{
    throw "'card_composed_condition'";
  }
}

function number(){
  return tokens[index] >= 0 && tokens[index] <= 13 ? true : false;
}

function operator(){
  if(verificar("<")){
    if(exigir("<")){

    }else{
      throw "'<'"
    }
  }else if(verificar(">")){
    if(exigir(">")){

    }else{
      throw "'>'"
    }
  }else if(verificar("<=")){
    if(exigir("<=")){

    }else{
      throw "'<='"
    }
  }else if(verificar(">=")){
    if(exigir(">=")){

    }else{
      throw "'>='"
    }
  }else if(verificar("==")){
    if(exigir("==")){

    }else{
      throw "'=='"
    }
  }else if(verificar("!=")){
    if(exigir("!=")){

    }else{
      throw "'!='"
    }
  }
}

function deck_simple_condition(){
  if(verificar("isEmpty")){
    if(exigir("isEmpty")){
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
