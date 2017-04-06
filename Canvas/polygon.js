function polygon(c, n, x, y, r, angle=0, counterclockwise=false) {
	c.moveTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
	var delta = 2 * Math.PI / n;

	for(var i = 1; i < n; i++) {
		angle += counterclockwise? -delta : delta;
		c.lineTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
	}
	c.closePath();
}
window.onload = function() {	
	var canvas = document.getElementById("polygon");
	var context = canvas.getContext("2d");
	context.beginPath();
	polygon(context, 3, 100, 70, 50, 30);
	context.fillStyle = "#ccc";
	// context.fillRect(0, 0, 100, 10);
	context.strokeStyle = "#008";
	context.lineWidth = 5;
	context.fill();
	context.stroke();
}

