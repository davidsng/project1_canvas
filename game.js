// Declare all the variables for my game
var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var x = canvas.width / 2    // starting x positon of the ball
var y = canvas.height - 30 // starting y positon of the ball
var dx = 2
var dy = -2
var ballRadius = 10
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2
var rightPressed = false
var leftPressed = false
var ballSpeed = 10

// building the bricks
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var bricks = []
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

// variable for counting the score
var score = 0

// Make canvas draw ball
function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

// Make canvas draw the paddle
function drawPaddle () {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '0095DD'
  ctx.fill()
  ctx.closePath
}

// Make canvas draw the bricks by looping through
function drawBricks () {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath
      }
    }
  }
}

// Function to detect when ball hits brick

function collisionDetection () {
  for (var c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r]
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          score += 1
          if (score === brickRowCount * brickColumnCount) {
            // alert('Congratulations, you have won!')
            document.location.reload()
          }
        }
      }
    }
  }
}

// function to count score

function drawScore () {
  ctx.font = '12px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText('Score: ' + score, 8, 20)
}

// overall draw function
function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetection()
  drawScore()
  // bounce off the side walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }

  // change y-direction when ball hits paddle, side walls and top wall
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      // clearInterval(timerRef)
      // ballSpeed -= 0.01
      // setInterval(draw, ballSpeed)
      dy = -dy
    } else {
      // alert('Game Over')
      document.location.reload()
    }
  }
  x += dx
  y += dy
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
}

// To listen for whether user presses keyboard (keydown) or not
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

function keyDownHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = true
  } else if (e.keyCode === 37) {
    leftPressed = true
  }
}

function keyUpHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = false
  } else if (e.keyCode === 37) {
    leftPressed = false
  }
}

function mouseMoveHandler (e) {
  var relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2
  }
}

// var timerRef = setInterval(draw, ballSpeed)
setInterval(draw, ballSpeed)
