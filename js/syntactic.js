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
		   	   error("Expected }");
		   	 }
	      }
	      else {
	    	error("Expected {");
	      }
	    }
	    else {
	      error("Expected program");
	    }
	  }
	  else {
	 	error("Expected class");
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

function verificar_number(){
	return !isNaN(tokens[index]); 
}

function functions(){

}

function main_function(){
	
}

function expression(){
	if(verificar("if")){
		if_expression();
	}
	else if(verificar("while")){
		while_expression();
	}else if(verificar("iterate"){
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
  
}