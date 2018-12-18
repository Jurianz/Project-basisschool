class Question extends ViewBase {

    private questions: Array<any>;
    private numberRandom: number;
    private keyBoardListener: KeyBoardListener;
    private questionAnswer: string;

    constructor() {
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.keyBoardListener = new KeyBoardListener();
        this.gameState = "QUESTION"
        this.questionAnswer = null;
        this.questions = [
            {
                question: "Welke van de volgende steden ligt in Engeland?",
                a: "München",
                b: "Liverpool",
                c: "Monaco",
                answer: "Liverpool"
            }, {
                question: "Welke rivier begint in Frankrijk en loopt door naar Belgie en Nederland?",
                a: "Rijn",
                b: "Seine",
                c: "Rhône",
                answer: "Rijn"
            }, {
                question: "Welke gebergte grenst tussen Frankrijk en Spanje?",
                a: "Pyreneeën",
                b: "Alpen",
                c: "Ardennen",
                answer: "Pyreneeën"
            }, {
                question: "Wat is de hoofdstad van Frankrijk?",
                a: "Monaco",
                b: "Lyon",
                c: "Parijs",
                answer: "Parijs"
            }, {
                question: "Hoe noem je de landen in Noord-Europa ook wel?",
                a: "Scandinavië",
                b: "Benelux",
                c: "Balkanlanden",
                answer: "Scandinavië"
            }, {
                question: "Wat is de hoofdstad van Noorwegen?",
                a: "Stockholm",
                b: "Oslo",
                c: "Helsinki",
                answer: "Oslo"
            }, {
                question: "Wat is het meest voorkomende klimaat van West-Europa?",
                a: "Landklimaat",
                b: "Tropisch limaat",
                c: "Zeeklimaat",
                answer: "Zeeklimaat"
            }, {
                question: "Hoe is de welvaart van Noord-Europa?",
                a: "Slecht",
                b: "Gemiddeld",
                c: "Goed",
                answer: "Goed"
            }
        ]
        this.numberRandom = this.canvas.randomNumber(0, this.questions.length - 1)
    }


    createScreen = () => {
        this.canvas.clearCanvas();
        // this.canvas.writeImageToCanvas("./assets/images/backgrounds/questionView.png", this.canvas.getCenter().X - 425, 50);
        this.canvas.writeTextToCanvas(this.questions[this.numberRandom].question, 30, this.canvas.getCenter().X, 50, "white");
        this.canvas.writeTextToCanvas(` 1: ${this.questions[this.numberRandom].a}`, 50, this.canvas.getCenter().X + 100, 200, "white", "left");
        this.canvas.writeTextToCanvas(`2: ${this.questions[this.numberRandom].b}`, 50, this.canvas.getCenter().X + 100, 300, "white", "left");
        this.canvas.writeTextToCanvas(`3: ${this.questions[this.numberRandom].c}`, 50, this.canvas.getCenter().X + 100, 400, "white", "left");
        if (this.keyBoardListener.getOnePressed()) {
            this.questionAnswer = this.questions[this.numberRandom].a;
        }
        if (this.keyBoardListener.getTwoPressed()) {
            this.questionAnswer = this.questions[this.numberRandom].b;
        }
        if (this.keyBoardListener.getThreePressed()) {
            this.questionAnswer = this.questions[this.numberRandom].c;
        }
        if (this.questionAnswer !== null) {
            if (this.questions[this.numberRandom].answer === this.questionAnswer) {
                alert("Goed gedaan")
                location.reload();
                this.gameState = "PLAY";
            } else {
                alert("Helaas")
                location.reload();
            }
        }
    }
    getGameState(): string {
        return this.gameState
    }
}