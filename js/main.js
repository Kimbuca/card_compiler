window.onload = function(){   

    //promtUserIntermediate();

}

function myFunction() {
    //preprocess program
    var texto = editor.getValue();
    //everything as a single iterable string
    var array =texto.replace(/(\t)/g," ").split(" ").join(" ");     

    var lex = new scanner(array);
    lex.analyze();
    tokens = lex.getTokens();

    for(i in tokens)
        console.log(tokens[i].token);
    
    var intermedCod = syntactic_analysis(tokens);
    console.log(intermedCod);
    if(intermedCod != null){
        execIntermediateCod(intermedCod);
    } 
}

function promtUserIntermediate(){
    var code =  prompt('Ingresa el codigointermedio');
    
    if(code != null){
        let myCode = code.split(",");
        console.log(myCode);
        execIntermediateCod(myCode);
    } 
}