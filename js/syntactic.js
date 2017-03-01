function syntactic_analysis(tokens){

	console.log(tokens);
	
	//Guardar tokens para que accedan todos los demas

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
	return true;
}

function verificar(str){
	return true;

}

function error(str){
	toastr.error('Error in compilation: ' + str);
};