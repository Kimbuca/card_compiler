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

    var intermedCod = syntactic_analysis(tokens);

    console.log(intermedCod)
    if(intermedCod != null){
        execIntermediateCod(intermedCod);
    } 

    var currentProgram = editor.getValue();
    localStorage.setItem("cardCompiler:D", currentProgram);

}

function promtUserIntermediate(){
    var code =  prompt('Ingresa el codigointermedio');
    
    if(code != null){
        let myCode = code.split(",");
        console.log(myCode);
        execIntermediateCod(myCode);
    } 
}