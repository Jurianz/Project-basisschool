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
    constructor(canvas, imgSource, xPos, yPos, width, height, dPos = -4, wPos = 4) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = dPos;
        this.wPos = wPos;
    }
    move() {
        this.xPos += this.dPos;
        this.yPos -= this.wPos;
        if (this.getX() < 0) {
            this.dPos = -this.dPos;
        }
        if (this.getX() + (this.getWidth() - 10) > window.innerWidth) {
            this.dPos = -this.dPos;
        }
        if (this.getY() < 0) {
            this.wPos = -this.wPos;
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
        this.wPos = 4;
    }
    removeLife() {
        this.wPos = -this.wPos;
        this.xPos = this.canvas.getCenter().X;
        this.yPos = this.canvas.getCenter().Y;
    }
    collidedWithBlock() {
        this.wPos = -this.wPos;
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
        element.style.zIndex = "-1";
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
    ;
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
            if (event.keyCode == 49) {
                this.onePressed = true;
            }
            if (event.keyCode == 50) {
                this.twoPressed = true;
            }
            if (event.keyCode == 51) {
                this.threePressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
            if (event.keyCode == 49) {
                this.onePressed = false;
            }
            if (event.keyCode == 50) {
                this.twoPressed = false;
            }
            if (event.keyCode == 51) {
                this.threePressed = false;
            }
        };
        this.leftPressed = false;
        this.rightPressed = false;
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getOnePressed() {
        return this.onePressed;
    }
    getTwoPressed() {
        return this.twoPressed;
    }
    getThreePressed() {
        return this.threePressed;
    }
    resetAnswer() {
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
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
            if (this.gameState === "PLAY") {
                this.canvas.clearCanvas();
                this.player.move();
                this.player.draw();
                this.ball.move();
                this.ball.draw();
                this.canvas.writeTextToCanvas(`lives: ${this.player.getLives()}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                if (this.player.isCollidingWithBall(this.ball)) {
                    this.ball.collidedWithPlayer();
                }
                for (let index = 0; index < this.blockArray.length; index++) {
                    this.blockArray[index].draw();
                    if (this.ball.isCollidingWithBlock(this.blockArray[index])) {
                        this.ball.collidedWithBlock();
                        this.blockArray.splice(index, 1);
                        if (this.blockArray.length == 12 || this.blockArray.length == 9 || this.blockArray.length == 6 || this.blockArray.length == 3) {
                            this.questionAnswer = null;
                            this.numberRandom = this.canvas.randomNumber(0, this.questions.length - 1);
                            this.gameState = "QUESTION";
                            document.body.style.background = "url('./assets/images/backgrounds/questionView.png') no-repeat ";
                            document.body.style.backgroundSize = "cover";
                            document.body.style.zIndex = "-1";
                        }
                    }
                }
            }
            if (this.gameState === "QUESTION") {
                this.canvas.clearCanvas();
                this.canvas.writeImageToCanvas(`./assets/images/question/${this.questions[this.numberRandom].picture}`, 50, 165);
                this.canvas.writeTextToCanvas(this.questions[this.numberRandom].question, 30, this.canvas.getCenter().X, 50, "white");
                this.canvas.writeTextToCanvas(` 1: ${this.questions[this.numberRandom].a}`, 50, this.canvas.getCenter().X + 100, 200, "white", "left");
                this.canvas.writeTextToCanvas(`2: ${this.questions[this.numberRandom].b}`, 50, this.canvas.getCenter().X + 100, 300, "white", "left");
                this.canvas.writeTextToCanvas(`3: ${this.questions[this.numberRandom].c}`, 50, this.canvas.getCenter().X + 100, 400, "white", "left");
                if (this.keyBoardListener.getOnePressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].a;
                    this.compareAnswers();
                }
                if (this.keyBoardListener.getTwoPressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].b;
                    this.compareAnswers();
                }
                if (this.keyBoardListener.getThreePressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].c;
                    this.compareAnswers();
                }
            }
            if (this.blockArray.length < 1) {
                alert('Goed gedaan!');
                location.reload();
            }
            if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
                this.player.removeLife();
                this.ball.removeLife();
            }
        };
        this.compareAnswers = () => {
            if (this.questions[this.numberRandom].answer === this.questionAnswer) {
                alert('Goed gedaan! Je antwoord was goed (LET OP: Het spel gaat meteen verder!)');
            }
            else {
                alert(`Helaas! Het goede antwoord was ${this.questions[this.numberRandom].answer} (LET OP: Het spel gaat meteen verder!)`);
            }
            this.gameState = "PLAY";
            this.canvas.clearCanvas();
            this.keyBoardListener.resetAnswer();
            document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
            document.body.style.backgroundSize = "cover";
            document.body.style.zIndex = "-1";
        };
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyBoardListener = new KeyBoardListener();
        this.questionAnswer = null;
        this.gameState = "PLAY";
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
        this.canvas = new Canvas(canvasElement);
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", 500, this.canvas.getHeight() - 30, 200, 25);
        this.ball = new Ball(canvasElement, "./assets/images/balls/redball.png", 900, 500, 35, 35);
        this.blockArray = [new Block(canvasElement, this.imageArray[1], 10, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 200, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 390, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 580, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 770, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 960, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 1150, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 1340, 30, 184, 61),
            new Block(canvasElement, this.imageArray[1], 10, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 200, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 390, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 580, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 770, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 960, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 1150, 100, 184, 61),
            new Block(canvasElement, this.imageArray[1], 1340, 100, 184, 61)];
        this.questions = [
            {
                question: "Welke van de volgende steden ligt in Engeland?",
                a: "München",
                b: "Liverpool",
                c: "Monaco",
                answer: "Liverpool",
                picture: "england.png"
            }, {
                question: "Welke rivier begint in Frankrijk en loopt door naar Belgie en Nederland?",
                a: "Rijn",
                b: "Seine",
                c: "Rhône",
                answer: "Rijn",
                picture: "rijn.png"
            }, {
                question: "Welk gebergte grenst tussen Frankrijk en Spanje?",
                a: "Pyreneeën",
                b: "Alpen",
                c: "Ardennen",
                answer: "Pyreneeën",
                picture: "pyreneeen.png"
            }, {
                question: "Wat is de hoofdstad van Frankrijk?",
                a: "Monaco",
                b: "Lyon",
                c: "Parijs",
                answer: "Parijs",
                picture: "france.png"
            }, {
                question: "Hoe noem je de landen in Noord-Europa ook wel?",
                a: "Scandinavië",
                b: "Benelux",
                c: "Balkanlanden",
                answer: "Scandinavië",
                picture: "fjord.png"
            }, {
                question: "Wat is de hoofdstad van Noorwegen?",
                a: "Stockholm",
                b: "Oslo",
                c: "Helsinki",
                answer: "Oslo",
                picture: "norway.png"
            }, {
                question: "Wat is het meest voorkomende klimaat van West-Europa?",
                a: "Landklimaat",
                b: "Tropisch klimaat",
                c: "Zeeklimaat",
                answer: "Zeeklimaat",
                picture: "west_europe.png"
            }, {
                question: "Hoe is de welvaart van Noord-Europa?",
                a: "Slecht",
                b: "Gemiddeld",
                c: "Goed",
                answer: "Goed",
                picture: "north_europe.png"
            }
        ];
        window.setInterval(this.createScreen, 1000 / 60);
    }
}
class StartView extends ViewBase {
    constructor() {
        super();
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-2";
    }
    createScreen() {
        this.canvas.writeTextToCanvas('World Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeButtonToCanvas('./assets/images/startscreenButton.png');
    }
}
//# sourceMappingURL=app.js.map