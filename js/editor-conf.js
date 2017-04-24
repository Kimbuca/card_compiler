var editor;
(function editorSetup() {
	editor = ace.edit("editor");
	editor.resize(true);

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");

	editor.getSession().setTabSize(4);

	var prevProgram = localStorage.getItem("cardCompiler:D");
	if(prevProgram){
		editor.setValue(prevProgram, -1);
	}
	
})();



