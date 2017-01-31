function myFunction() {
    var texto = document.getElementById("exampleTextarea").value;
    var array = texto.replace(/\n/g, " ").split(" ");

    document.getElementById("demo").innerHTML = array;
}