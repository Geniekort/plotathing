$(function(){if($("body").hasClass("plotter")){
	/* initialization of variables */
	var j = 0;	
	var xmin = -10, xmax = 10, xtick = 1, realXtick = xtick, formula = "x^2", maxNrPoints = 250;
	var canvas = document.getElementById('myChart');
	var ctx = canvas.getContext('2d');
	var xPoints = [], yPoints = getScopeRange(-10,10,1);
	
	var data = {
		labels : yPoints,
		datasets: [{
            label: formula,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            
            data: xPoints,
            spanGaps: false,
        }]
	};
	
	var options ={		
        hover: {
            // Overrides the global setting
            mode: 'x'
        }
	};
	
	var plot = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {		
			title: {
				display: true,
				text: 'Plot'
			},
			
			maintainAspectRatio : true
	}
	});

	var inputXmin = $("#usrXmin");
	var inputXmax = $("#usrXmax");
	var inputXtick = $("#usrXtick");
	var inputFormul = $("#usrFormula");

	inputXmin.val(xmin);
	inputXmax.val(xmax);
	inputXtick.val(xtick);
	inputFormul.val(formula);
	
	updatePlot();
	
	
	
	/* Functions defined below */
	
	function updatePlot(){
		
		if(!checkFormula(formula)){
			inputFormul.effect("shake", {times:2, distance: 10, direction: 'right'});
			return;
		}
		
		updateScope();
		plot.data.datasets[0].data = newValues(formula);
		plot.data.datasets[0].label = formula;
		plot.update(); 
		
	}
	
	// Function to update the scope of the graph
	function updateScope(){
		plot.data.labels = getScopeRange();
	}
	
	//Get the range from the xmin and xmax as an array
	function getScopeRange(){
		updateTick();
		console.log(xtick);
		var list = [];
		for(var i = xmin; i <= xmax; i += xtick) {
			list.push(+i.toPrecision(5));
		}
		
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
	
	/* Change layout to (in)validate element*/
	function validate(el, val){
		if(!val){
			el.css("box-shadow", "0px 0px 5px 5px rgba(200,0,0,0.75)");
		}else{
			el.css("box-shadow", "none");
		}
	}
	
	/* Function to check validity of formula */
	function checkFormula(f){
		try{
			math.eval(f, {x:1});
			return true;
		}catch(err){
			return false;
		}
	}
	
	/* Update Tick */
	
	function updateTick(){
		
		xtick = realXtick;
		
		if(!checkTick()){ //  Check number of nodes
			xtick = Math.ceil((xmax-xmin) / maxNrPoints);
		}
		
	}
	
	/* Function to check and FIX xtick */
	function checkTick(){
		nrpoints = (xmax - xmin) / xtick;
		if(nrpoints > maxNrPoints ){
			return false;
		}else{
			return true;
		}
	}
	
	/* Function to check range */
	
	function validateRange(){
		var outcome = (xmax > xmin);
		validate(inputXmax, outcome);
		validate(inputXmin, outcome);
		return outcome;
		
	}
	
	//update upper bound
	inputXmax.on('input', function(){
		xmax = parseFloat($(this).val());
		if(validateRange()){
			checkTick();
			updatePlot();
		}
	});
	
	//update lower bound
	inputXmin.on('input', function(){
		xmin = parseFloat($(this).val());
		if(validateRange()){
			checkTick();
			updatePlot();
		}
	});
	
	//update tick
	inputXtick.on('input', function(){

		realXtick = xtick = $(this).val();
		
		if(xtick == 0 || xtick == ''){
			xtick = 1;
			validate(inputXtick, false);
		}else{
			validate(inputXtick, true);	
			realXtick = xtick = parseFloat(xtick);
		}
		
		updateTick();
		updatePlot();
	});
	
	//Bind the change of formula/polynomial input to change of graph
	inputFormul.on('input', function updatePlotter(){
		formula = this.value;
		
		if(checkFormula(formula)){
			validate($(this), true);
			updatePlot();
			
		}else{
			validate($(this), false);
		}
	});
}});

