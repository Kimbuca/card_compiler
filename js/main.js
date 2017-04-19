
function myFunction() {
	//preprocess program
    var texto = editor.getValue();
    //everything as a single iterable string
    var array =texto.replace(/(\t)/g," ").split(" ").join(" ");		
   
    //lexicography
    var lex = new scanner(array);
    lex.analyze();
    tokens = lex.getTokens();

    for(i in tokens)
        console.log(tokens[i].token);
    
    syntactic_analysis(tokens);
}
