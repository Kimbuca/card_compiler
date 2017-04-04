

var canvas = document.getElementById("canvas-container");

var renderer = new PIXI.CanvasRenderer(600, 500);
canvas.appendChild(renderer.view);
renderer.backgroundColor = 0x458B00;

var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);