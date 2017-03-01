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
		   	   throw ("Expected }");
		   	 }
	      }
	      else {
	    	throw ("Expected {");
	      }
	    }
	    else {
	      throw ("Expected 'program' ");
	    }
	}
	else {
		throw ("Expected class");
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

function throw (str){
	toastr.throw ('throw  in compilation: ' + str);
};

function functions(){

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
				return throw "Expected ')' ";
			if(exigir("{")){
				body();
				if(!exigir("}"))
					throw "Expected '}' ";
				elseif();
			}else{
				throw "Expected '{' ";
			}
		}else{
			throw "Expected 'if' ";
		}
	}else{
		throw "Expected 'if' ";
	}
}


function elseif(){

	if(verificar("else")){
		if(exigir("{")){
			body();
			if(!exigir("}"))
			throw "Expected '}'";
		}else{
			throw "Expected '{'";
		}
	}else{
		return;
	}

}


function while_expression(){
	if(exigir("while")){

	}else{
		throw "Expected 'while'";
	}
}

