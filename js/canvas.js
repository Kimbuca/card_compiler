const PLOT_NUMBER = 55;

plotGrid();

function createPlot(number) {	
  newplot= $(`<span id="plot${number}"></span>`);
  return newplot;

}

function plotGrid() {
	for(var i=1; i<=PLOT_NUMBER; i++){
		plot = createPlot(i);
		$('#canvas-container').append(plot);
	}
}

function resetCanvas() {
	$('#canvas-container').empty();
	plotGrid();
} 