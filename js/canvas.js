const PLOT_NUMBER = 53;

plotGrid();

function createPlot(number) {	
  newplot= $(`<span class="deck-space" id="plot${number}"> ${number-1} </span>`);
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