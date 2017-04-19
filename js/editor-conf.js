var editor;
(function editorSetup() {
	editor = ace.edit("editor");
	editor.resize(true);

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");

	editor.getSession().setTabSize(4);
	editor.setValue("class program {}");
})();



