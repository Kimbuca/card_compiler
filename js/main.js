var editor;
(function editorSetup() {
	editor = ace.edit("editor");
	editor.resize(true);

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");

	editor.getSession().setTabSize(4);
	editor.setValue("class program {}");

})();


function myFunction() {
	//preprocess program
    var texto = editor.getValue();
    var array =texto.replace(/(\t)/g," ").split(" ").join(" ");		//everything as a single iterable string
    //array.replace(/\t/g, " ").split(" ").join(" ");

    //lexicography
    var lex = new scanner(array);
    console.log(lex.analyze());	
    tokens = lex.getTokens();
    console.log(tokens);
    syntactic_analysis(tokens);
    
    document.getElementById("demo").innerHTML = array;
}