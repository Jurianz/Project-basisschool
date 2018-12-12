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
        this.ctx.font = `${fontSize}px Mars`;
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
    getCenter() {
        return { X: this.canvas.width / 2, Y: this.canvas.height / 2 };
    }
}
class Game {
    constructor() {
        this.draw = () => {
            this.continentView.createScreen();
        };
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.ball = new Ball(canvasElement, './assets/images/balls/football.png', 100, 100, 10, 10, 0);
        this.player = new Player(canvasElement, './assets/images/bluePlayer.png', 200, 200, 100, 10);
        this.block = new Block(canvasElement, './assets/images/blueBlock.png', 50, 50, 40, 40);
        this.startView = new StartView();
    }
}
window.addEventListener('load', init);
function init() {
    const gameName = new Game();
    window.setInterval(gameName.draw, 1000 / 60);
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
class ViewBase {
    constructor() {
    }
    render() {
        this.canvas.clearCanvas();
        this.createScreen();
    }
}
class ContinentView extends ViewBase {
    constructor() {
        super();
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }
    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    }
}
class DifficultyView extends ViewBase {
    constructor() {
        super();
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }
    createScreen() {
        this.canvas.clearCanvas();
    }
}
class StartView extends ViewBase {
    constructor() {
        super();
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }
    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
        this.canvas.writeTextToCanvas('World Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeImageToCanvas('./assets/images/startscreenButton.png', this.canvas.getCenter().X - 267, this.canvas.getCenter().Y / 2.2);
    }
}
//# sourceMappingURL=app.js.map