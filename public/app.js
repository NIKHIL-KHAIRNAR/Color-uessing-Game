
var numSquares = 10
var colors = []
var pickedColor
var gameState =0;

var Score =0;
var squares = document.querySelectorAll(".square")
var colorDisplay = document.getElementById("colorDisplay")
var messageDisplay = document.getElementById("message")
var h1 = document.querySelector("h1")
var resetBtn = document.querySelector("#reset")
var modeBtns = document.querySelectorAll(".mode")




const socket = io();
init()

resetBtn.addEventListener("click", function() {
	reset()

})


function init() {



	setupSquares();
	
	reset()
}




function setupSquares() {

	for(var i =0; i < squares.length; i++) {

		//add click listener to square
		squares[i].addEventListener("click", function() {
			//grab color selected square
			var clickedColor = this.style.backgroundColor
			console.log("picked color "+pickedColor );
			console.log("clickedColor "+ clickedColor);
			console.log("condition "+clickedColor === pickedColor )
			//compare color to pickedColor
			if(gameState>=6){
				resetBtn.textContent = "Play Again"
				gameState=-1;
			
			}
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!"
				if(gameState < 6 ){
					resetBtn.textContent = "Next Level";
				}
				gameState= gameState +1;
				if(gameState == 0){
					resetBtn.textContent = "Play Again!";
					messageDisplay.textContent =  " Score is " +Score;
					Score=0;
				}
				Score = Score +1;
			
				changeColors(clickedColor)
				h1.style.backgroundColor = clickedColor
			} else {
				this.style.backgroundColor = "#232323"
				messageDisplay.textContent = "Try Again"
			
				Score = Score -1;
			}
			console.log("game state "+ gameState);
		})
		console.log("outside listner game state"+ gameState);
	}	
}

function reset() {

	colors = generateRandomColors(numSquares)
	pickedColor = pickColor()
	//colorDisplay.textContent = pickedColor
	
	resetBtn.textContent = "Play"
	messageDisplay.textContent = ""


	for(var i =0; i < squares.length; i++) {
		//add initial colors to squares
		if(colors[i]) {
			squares[i].style.display = "block"
			squares[i].style.backgroundColor = colors[i]
		} else {
			squares[i].style.display = "none"
		}
	}
	// h1.style.backgroundColor = "#232323"
	h1.style.backgroundColor = "steelblue"
}

function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color
	}
}
function series(n){

		if(n<=2){
			return 1;
		} else {
			return this.series(n-1) + this.series(n-2)
		}
}
function pickColor() {
	
	console.log("game state in pick color function"+ gameState);

	var random = series(gameState);
	console.log(random);
	return colors[random]
	
}

function generateRandomColors(num) {
	//make an array
	var arr = []

	//add num random colors to array
	for(var i = 0; i < num; i++) {
		arr.push(randomColor())
	}
	
	//return array
	return arr
}

function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256)
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256)
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256)

	return "rgb(" + r + ", " + g + ", " + b + ")"
}




