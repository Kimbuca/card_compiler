function syntactic_analysis(tokens){

	console.log(tokens);
	
	//Guardar tokens para que accedan todos los demas
	index = 0;
	
	program();

};

function program(tokens){
	  if ( exigir("class") ) {
	    if ( exigir("program") ) {
	      if ( exigir("{") ) {
		   	 functions();
		   	 main_function();
		   	 if ( !exigir("}") ) {
		   	   error("Expected '}'");
		   	 }
	      }
	      else {
	    	error("Expected '{'");
	      }
	    }
	    else {
	      error("Expected 'program'");
	    }
	  }
	  else {
	 	error("Expected 'class'");
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

function error(str){
	toastr.error('Error in compilation: ' + str);
};

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
   	 	error("Expected '}'");
   	   }
   	 } else {
   	   error("Expected '{'");
   	 }
      } else {
    	error("Expected ')'");
      }
    } else {
      error("Expected '('");
    }
  } else {
	error("Expected 'void'");
  }
}

function body(){
    expression();
    body_alpha();
}


void body_alpha(){
	if ( verificar ("void")){
		 expression();
		 body_alpha();
	}
}

function main_function(){
	
}