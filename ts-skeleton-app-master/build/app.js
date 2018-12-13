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
    constructor(canvas, imgSource, xPos, yPos, width, height, dPos = -6, aPos = 6) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = dPos;
        this.aPos = aPos;
    }
    move() {
        this.xPos -= this.dPos;
        this.yPos -= this.aPos;
        if (this.getX() < 0) {
            this.dPos = -6;
        }
        if (this.getX() + (this.getWidth() - 10) > window.innerWidth) {
            this.dPos = 6;
        }
        if (this.getY() < 0) {
            this.aPos = -6;
        }
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
    collidedWithPlayer() {
        this.aPos = 6;
    }
    removeLife() {
        this.aPos = 6;
        this.dPos = -6;
        this.xPos = this.canvas.getCenter().X;
        this.yPos = this.canvas.getCenter().Y;
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
    writeButtonToCanvas(src) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - 272, verticalCenter - 200);
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - 150 && event.x < horizontalCenter + 150) {
                if (event.y > verticalCenter - 180 && event.y < verticalCenter - 124) {
                    this.clearCanvas();
                    const levelView = new LevelView();
                }
            }
        });
    }
    getHeight() {
        return this.canvas.height;
    }
    ;
    getWidth() {
        return this.canvas.width;
    }
    ;
}
class Game {
    constructor() {
        this.draw = () => {
            this.startView.createScreen();
        };
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.startView = new StartView();
        this.draw();
    }
}
window.addEventListener('load', init);
function init() {
    const gameName = new Game();
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
            this.xPos -= 6;
        }
        if (this.keyBoardListener.getRightPressed()) {
            this.xPos += 6;
        }
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.getX() + (this.getWidth()) > window.innerWidth) {
            this.xPos = window.innerWidth - (this.getWidth());
        }
    }
    isCollidingWithBall(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
    getLives() {
        return this.lives;
    }
    removeLife() {
        this.lives -= 1;
        if (this.lives == 0) {
            alert('Game over');
            location.reload();
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
        this.createScreen();
    }
    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
        this.canvas.writeImageToCanvas("./assets/images/continents/europe.png", this.canvas.getCenter().X - 151, this.canvas.getCenter().Y - 116);
    }
}
class DifficultyView extends ViewBase {
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
class LevelView extends ViewBase {
    constructor() {
        super();
        this.imageArray = ["./assets/images/blocks/blueBlock.png",
            "./assets/images/blocks/redBlock.png",
            "./assets/images/blocks/greenBlock.png",
            "./assets/images/blocks/greyBlock.png",
            "./assets/images/blocks/orangeBlock.png",
            "./assets/images/blocks/purpleBlock.png",
            "./assets/images/blocks/yellowBlock.png"
        ];
        this.createScreen = () => {
            document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
            document.body.style.backgroundSize = "cover";
            document.body.style.zIndex = "-2";
            this.canvas.clearCanvas();
            this.player.move();
            this.player.draw();
            if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
                this.player.removeLife();
                this.ball.removeLife();
            }
            if (this.player.isCollidingWithBall(this.ball)) {
                this.ball.collidedWithPlayer();
                this.ball.move();
                this.ball.draw();
                this.canvas.writeTextToCanvas(`lives: ${this.player.getLives()}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
            }
            else {
                this.canvas.writeTextToCanvas(`lives: ${this.player.getLives()}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                this.ball.move();
                this.ball.draw();
                for (let i = 10; i < this.canvas.getWidth() - 190; i += 190) {
                    this.canvas.writeImageToCanvas(this.imageArray[1], i, 30);
                }
            }
        };
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", 500, this.canvas.getHeight() - 30, 200, 25);
        this.ball = new Ball(canvasElement, "./assets/images/balls/redball.png", 900, 500, 35, 35);
        window.setInterval(this.createScreen, 1000 / 60);
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
        document.body.style.zIndex = "-3";
        this.canvas.writeTextToCanvas('World Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeButtonToCanvas('./assets/images/startscreenButton.png');
    }
}
//# sourceMappingURL=app.js.map