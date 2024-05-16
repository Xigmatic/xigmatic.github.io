var steps = 1000;
var stepSize = 0.0001;
var force = 3;
const vel = 10;
const g = 9.8;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resScale = 2;
canvas.width *= resScale;
canvas.height *= resScale;
canvas.style.width = canvas.width/resScale + 'px';
canvas.style.height = canvas.height/resScale + 'px';

const slider1 = document.getElementById("stepSize");
const slider2 = document.getElementById("force");

var x = 0;
var y = 0;
var theta = 0;



async function drawLoop() {
	let numSegments = 0;

	ctx.beginPath(50,400);
	while(theta <= 2*Math.PI) {
		let temp = y;
		x = x + Math.cos(theta)*stepSize;
		y = y + Math.sin(theta)*stepSize;
		theta = theta + (force/((vel*vel)/g - 2*temp))*stepSize;

		ctx.lineTo(resScale*(50*x+50),resScale*(50*-y+400),2,0,6.28);
		

		//console.log(`(${x}, ${y})`);
		numSegments++;

		if(numSegments > 500000) {
			break;
		}
	}

	ctx.lineWidth = resScale;
	ctx.stroke();
	ctx.font = 25*resScale + "px verdana";
	ctx.fillText(numSegments + " segments", 50*resScale, 470*resScale);
}

drawLoop();

slider1.addEventListener("change", function() {
    console.log(slider1.value);
    ctx.clearRect(0,0,1000*resScale,500*resScale);
    x = 0;
    y = 0;
    theta = 0;
    stepSize = slider1.value;
    document.getElementById("s1").textContent = `Step Size: ${slider1.value}   `;
    drawLoop();
}, false);


slider2.addEventListener("change", function() {
    console.log(slider2.value);
    ctx.clearRect(0,0,1000*resScale,500*resScale);
    x = 0;
    y = 0;
    theta = 0;
    force = slider2.value;
    document.getElementById("s2").textContent = `Force: ${slider2.value}   `;
    drawLoop();
}, false);
