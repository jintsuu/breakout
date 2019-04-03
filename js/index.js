const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

let score = 0;

// Paddle's params
const paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

// started coordinates of ball
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

// Ball's params
let ballColor = "#0095DD"
const ballRadius = 10;

// Bricks params
let brickRowCount = 3;
let brickColumnCount = 6;
let brickHeight = 20;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickWidth = (canvas.width - brickOffsetLeft*2 - brickPadding*(brickColumnCount - 1))/brickColumnCount;


const bricks = [];
for(let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, isHitted: false};
    } 
}

// Moving our paddle by mouse
canvas.onmousemove = (e) => {
    let newX = e.clientX-(window.innerWidth-480)/2;
    newX > canvas.width-paddleWidth ? paddleX = canvas.width-paddleWidth : paddleX = newX ;
}

// Detection
function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            let brick = bricks[c][r];
            if(!brick.isHitted) {
                if( x + ballRadius > brick.x  && x - ballRadius < brick.x + brickWidth  && y + ballRadius > brick.y  && y - ballRadius < brick.y + brickHeight ) {
                    dx = Math.floor(Math.random() * 2 - 2);
                    dy = -dy;
                    brick.isHitted = true;
                    score++;
                    if(score === brickRowCount * brickColumnCount) {
                        alert( "YOU WIN!");
                        clearInterval(drawingInverval);
                        const startNewGame = confirm("Start new game?")
                        startNewGame ? document.location.reload() : null;
                    }
                }
            }        
        }
    }
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
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if( !bricks[c][r].isHitted ){
                const brickX = c*(brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r*(brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "0095DD";
                context.fill();
                context.closePath();
            }
        }
    }
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: " + score, 8, 20);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    collisionDetection();
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();

    if( y + dy < ballRadius ) {
        dx = Math.floor(Math.random() * 2 - 2);
        dy = -dy;
        randomColor();
    } else if( y + dy > canvas.height - ballRadius ) {
        if( x + ballRadius > paddleX && x - ballRadius  < paddleX + paddleWidth ) {
            dx = Math.floor(Math.random() * 2 - 2);
            dy = -dy;
            if (x + ballRadius > paddleX + paddleWidth/2 && x - ballRadius  < paddleX + paddleWidth ) {
                dx = -dx;
            }
        } else {
            alert("Game Over");
            clearInterval(drawingInverval);
            const startNewGame = confirm("Start new game?")
            startNewGame ? document.location.reload() : null;
        }
    }

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        randomColor();
    }

    x += dx;
    y += dy;
    

}

const drawingInverval = setInterval(draw, 10);


