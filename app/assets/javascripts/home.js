$(function(){if($("body").hasClass("home")){
	
	var canvas = document.getElementById("introChart");
	var ctx = canvas.getContext('2d'),
	xPoints = [10,9,8,7,6,5,4,3,2,1,0],
	yPoints = [0,1,2,3,4,5,6,7,8,9,10],
	data = {
		labels : yPoints,
		datasets: [{
            label: '10-x',
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            
            data: xPoints,
            spanGaps: false,
        }]
	},
	options ={		
        hover: {
            // Overrides the global setting
            mode: 'x'
        }
	};
	
	var plot = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {		
		}
	});
}});
