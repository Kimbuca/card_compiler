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

function functions(){

}

function main_function(){
	
}