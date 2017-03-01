function syntactic_analysis(tokens){

	console.log(tokens);
	//Guardar tokens para que accedan todos los demas
	index = 0;


	try{

		program();

	}	catch (e){
		toastr.error("Error in compilation: Expected " + e);
	}

};



function program(tokens){
	  if ( exigir("class") ) {
	    if ( exigir("program") ) {
	      if ( exigir("{") ) {
		   	 functions();
		   	 main_function();
		   	 if ( !exigir("}") ) {

		   	   throw "'}'";
		   	 }
	      }
	      else {
	    	throw "'{'";
	      }
	    }
	    else {
	      throw "'program'";
	    }
	  }
	  else {
	 	throw "'class'";
	  }
}





function exigir(str){
	if(tokens[index] == str){
		index++;
		return true;
	};
	return false;
}

function verificar(str){
	return tokens[index] == str ? true : false;
}

function functions(){

    if(verificar("void")){
   	 functionSingle();
   	 functions_alpha();
    }

}

function functions_alpha() {
  if ( verificar( "void" ) ) {
    functionSingle();
    functions_alpha();
  }
}

function functionSingle() {
  if ( exigir( "void" ) ) {
  	// Aqui va en nombre de la function para hacerla
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
    expression();
    body_alpha();
}


function body_alpha(){
	if ( verificar ("void")){
		 expression();
		 body_alpha();
	}
}

function main_function(){
	
}

function number_of_deck(){
	return tokens[index] >= 0 && tokens[index] <= 52 ? true : false;
}


function if_expression(){

	if(exigir("if")){
		if(exigir("(")){
			conditional();
			if(!exigir(")"))
				return throw "')'";
			if(exigir("{")){
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
			body();
			if(!exigir("}"))
			throw "'}'";
		}else{
			throw "'{'";
		}
	}else{
		return;
	}

}


function while_expression(){
	if(exigir("while")){
	}else{
		throw "'while'";
	}
}

