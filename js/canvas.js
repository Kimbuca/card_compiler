const PLOT_NUMBER = 52;

plotGrid();

function createPlot(number) {	
  newplot= $(`<span class="deck-space" id="plot${number}"> ${number} </span>`);
  return newplot;

}

function plotGrid() {
	for(var i=0; i<=PLOT_NUMBER; i++){
		plot = createPlot(i);
		$('#canvas-container').append(plot);
	}
}

function resetCanvas() {
	$('#canvas-container').empty();
	plotGrid();
} 