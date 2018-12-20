///<reference path="Viewbase.ts"/>
class LevelView extends ViewBase {

    private questions: Array<any>;
    private numberRandom: number;
    private keyBoardListener: KeyBoardListener;
    private questionAnswer: string;
    private player: Player;
    private ball: Ball;
    private blockArray: Array<any>;
    private gameState: string;
    private imageArray: Array<string> = ["./assets/images/blocks/blueBlock.png",
        "./assets/images/blocks/redBlock.png",
        "./assets/images/blocks/greenBlock.png",
        "./assets/images/blocks/greyBlock.png",
        "./assets/images/blocks/orangeBlock.png",
        "./assets/images/blocks/purpleBlock.png",
        "./assets/images/blocks/yellowBlock.png"
    ];


    public constructor() {
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
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
        new Block(canvasElement, this.imageArray[1], 1340, 100, 184, 61)]
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

    createScreen = () => {
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
                        this.numberRandom = this.canvas.randomNumber(0, this.questions.length - 1)
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
            this.canvas.writeImageToCanvas(`./assets/images/question/${this.questions[this.numberRandom].picture}`, 50, 165)
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
            alert('Goed gedaan!')
            location.reload();
        }

        if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
            this.player.removeLife();
            this.ball.removeLife();
        }
    }

    compareAnswers = () => {
        if (this.questions[this.numberRandom].answer === this.questionAnswer) {
            alert('Goed gedaan! Je antwoord was goed (LET OP: Het spel gaat meteen verder!)')
        } else {
            alert(`Helaas! Het goede antwoord was ${this.questions[this.numberRandom].answer} (LET OP: Het spel gaat meteen verder!)`)
        }
        this.gameState = "PLAY";
        this.canvas.clearCanvas();
        this.keyBoardListener.resetAnswer();
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    }
}