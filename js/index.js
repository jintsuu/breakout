const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Paddle's params
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

// started coordinates of ball
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

// Ball's params
let ballColor = "#0095DD"
const ballRadius = 10;


// Moving our paddle by mouse
canvas.onmousemove = (e) => {
    let newX = e.clientX-(window.innerWidth-480)/2;
    newX > canvas.width-paddleWidth ? paddleX = canvas.width-paddleWidth : paddleX = newX ;
}


// Functions for changing colors
function randomNum() {
    let randomInt = Math.floor(Math.random() * (255));
    while (randomInt === 238) {
        randomInt = Math.floor(Math.random() * (255));
    }
    return randomInt;
}

function randomColor() {
    ballColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
}



// Drawing functions
function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPaddle();

    if(y + dy < ballRadius) {
        dy = -dy;
        randomColor();
    } else if(y + dy > canvas.height - ballRadius) {
        alert("Game Over");
        clearInterval(drawingInverval);
    }

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        randomColor();
    }

    x += dx;
    y += dy;

}

const drawingInverval = setInterval(draw, 10);


