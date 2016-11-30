$(".static_pages.plotter").ready(function(){
	
	
	var j = 0;
	var xmin = -10, xmax = 10, xtick = 1, formula = "0";
	var canvas = document.getElementById('myChart'),
	ctx = canvas.getContext('2d'),
	xPoints = [],
	yPoints = getScopeRange(-10,10,1),
	data = {
		labels : yPoints,
		datasets: [{
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            
            data: xPoints,
            spanGaps: false,
        }]
	},
	options ={		
        
	}
	
	var plot = new Chart(ctx, {
		type: 'line',
		data: data,
		options: options
	});

	
	//Bind the change of formula/polynomial input to change of graph
	$("#usrFormula").change(function updatePlotter(){
		formula = this.value;
		if(true){
			$(this).css("box-shadow", "none");
			
			updatePlot();
			
			
		}else{
			$(this).css("box-shadow", "0px 0px 5px 5px rgba(200,0,0,0.75)");
		}
	});
	
	function updatePlot(){
		updateScope();
		plot.data.datasets[0].data = newValues(formula);
		plot.update(); 
		
	}
	
	// Function to update the scope of the graph
	function updateScope(){
		plot.data.labels = getScopeRange(xmin, xmax, xtick);
	}
	
	//Get the range from the xmin and xmax as an array
	function getScopeRange(ixmin, ixmax, ixtick){
		
		var list = [];
		for(var i = ixmin; i <= ixmax; i += ixtick) {
			list.push(+i.toPrecision(5));
		}
		var i = xmin;
		
		
		return list;
	}
	
	//Function to update the data, using the scope and the formula
	function newValues(formula){
		var newData = [];
		var range = getScopeRange(xmin, xmax, xtick);
		range.forEach(function(x){
			var scope = { x : x };
			newData.push(math.eval(formula,scope));
		});
		
		return newData;
	}
	
	
	//update upper bound
	$("#usrXmax").change(function(){
		xmax = parseFloat($(this).val());
		updatePlot();
	});
	
	//update lower bound
	$("#usrXmin").change(function(){
		xmin = parseFloat($(this).val());
		updatePlot();
	});
	
	//update tick
	$("#usrXtick").change(function(){
		xtick = parseFloat($(this).val());
		if(xtick == 0){
			xtick = 1;
			$(this).css("box-shadow", "0px 0px 5px 5px rgba(200,0,0,0.75)");
		}else{
			$(this).css("box-shadow", "none");
		}
		updatePlot();
	});
});