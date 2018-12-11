class Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height) {
        this.canvas = new Canvas(canvas);
        this.imgSource = imgSource;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    draw() {
        this.canvas.writeImageToCanvas(this.imgSource, this.xPos, this.yPos);
    }
    getX() {
        return this.xPos;
    }
    getY() {
        return this.yPos;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
class Ball extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height, speed) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.speed = speed;
    }
    move() {
    }
    isCollidingWithBlock(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
}
class Block extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height) {
        super(canvas, imgSource, xPos, yPos, width, height);
    }
}
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('clears canvas');
    }
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color, aligment = "center") {
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = aligment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    writeImageToCanvas(src, xCoordinate, yCoordinate) {
        let element = document.createElement("img");
        element.src = src;
        element.addEventListener("load", () => {
            this.ctx.drawImage(element, xCoordinate, yCoordinate);
        });
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Game {
    constructor() {
        this.draw = () => {
            this.canvas.clearCanvas();
            this.player.move();
            this.player.draw();
        };
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.ball = new Ball(canvasElement, './assets/images/redBall.png', 100, 100, 20, 20, 0);
        this.player = new Player(canvasElement, './assets/images/bluePlayer.png', 400, 600, 100, 10);
    }
}
window.addEventListener('load', init);
function init() {
    const gameName = new Game();
    window.setInterval(gameName.draw, 1000 / 60);
    console.log('in init');
}
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = true;
            }
            if (event.keyCode == 39) {
                this.rightPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
        };
        this.leftPressed = false;
        this.rightPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
}
class Player extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height, lives = 3) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.keyBoardListener = new KeyBoardListener();
        this.lives = lives;
    }
    move() {
        if (this.keyBoardListener.getLeftPressed()) {
            this.xPos -= 8;
        }
        if (this.keyBoardListener.getRightPressed()) {
            this.xPos += 8;
        }
    }
}
//# sourceMappingURL=app.js.map