///<reference path="Viewbase.ts"/>
class LevelView extends ViewBase {

    private easyQuestions: Array<any>;
    private difficultQuestions: Array<any>;
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
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", this.canvas.getCenter().X - 100, this.canvas.getHeight() - 30, 200, 25);
        this.ball = new Ball(canvasElement, "./assets/images/balls/redball.png", this.canvas.getCenter().X, 500, 35, 35);
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
        this.easyQuestions = [
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
                question: "Wat is de hoofdstad van Frankrijk?",
                a: "Monaco",
                b: "Lyon",
                c: "Parijs",
                answer: "Parijs",
                picture: "france.png"
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
            }, {
                question: "Welk land ligt net onder de poolcirkel?",
                a: "Scandinavië",
                b: "IJsland",
                c: "Nederland",
                answer: "IJsland",
                picture: "poolcirkel.png"
            }, {
                question: "Als iets belangrijk is voor meerdere landen, hoe noem je dat dan?",
                a: "Regionaal",
                b: "Nationaal",
                c: "Internationaal",
                answer: "Internationaal",
                picture: "internationaal.png"
            }, {
                question: "Welke hoort hier niet bij?",
                a: "Beroepsbevolking",
                b: "Gastarbeiders",
                c: "Wereldstad",
                answer: "Wereldstad",
                picture: "wereldstad.png"
            }, {
                question: "Welke zee grenst aan Nederland?",
                a: "De middelandse zee",
                b: "De rode zee",
                c: "De noordzee",
                answer: "De noordzee",
                picture: "zee.png"
            }, {
                question: "Wat spuit water heel hoog de lucht in?",
                a: "Geiser",
                b: "Fjord",
                c: "Vulkaan",
                answer: "Geiser",
                picture: "geiser.png"
            }, {
                question: "Hoe noem je het verschijnsel wat leidt tot verdwijnen van vis in de zee?",
                a: "Onderbevissing",
                b: "Overbevissing",
                c: "Scheepvaart",
                answer: "Overbevissing",
                picture: "vis.png"
            }, {
                question: "Hoe noem je een bos, wat alleen wordt gebruikt voor het hout?",
                a: "Mangrovebos",
                b: "Jungle",
                c: "Productiebos",
                answer: "Productiebos",
                picture: "bos.png"
            }, {
                question: "Waaruit bestaat de kust van Noorwegen?",
                a: "Duinen",
                b: "Fjorden",
                c: "Dijken",
                answer: "Fjorden",
                picture: "fjord.png"
            }
        ];
        this.difficultQuestions = [
            {
                question: "Welk gebergte grenst aan Frankrijk en Spanje?",
                a: "Pyreneeën",
                b: "Alpen",
                c: "Ardennen",
                answer: "Pyreneeën",
                picture: "pyreneeen.png"
            }, {
                question: "Hoe noem je de landen in Noord-Europa ook wel?",
                a: "Scandinavië",
                b: "Benelux",
                c: "Baltische Staten",
                answer: "Scandinavië",
                picture: "scandinavie.png"
            }, {
                question: "Wat is de hoofdstad van Noorwegen?",
                a: "Stockholm",
                b: "Oslo",
                c: "Helsinki",
                answer: "Oslo",
                picture: "norway.png"
            }, {
                question: "Wat is de grootste stad van West-Europa?",
                a: "Parijs",
                b: "Amsterdam",
                c: "Londen",
                answer: "Londen",
                picture: "londen.png"
            }, {
                question: "Met welk vervoersmiddel rijden mensen vaak in de stad?",
                a: "Auto",
                b: "Taxi",
                c: "Metro",
                answer: "Metro",
                picture: "traffic.png"
            }, {
                question: "Welke buurlanden heeft België naast Nederland en Duitsland?",
                a: "Frankrijk",
                b: "Frankrijk en Luxemburg",
                c: "Frankrijk en Engeland",
                answer: "Frankrijk en Luxemburg",
                picture: "belgium.png"
            }, {
                question: "Waar ligt Schotland in Groot-Brittanië?",
                a: "In het noorden",
                b: "in het midden",
                c: "in het zuiden",
                answer: "In het noorden",
                picture: "schotland.png"
            }, {
                question: "Waar bestaat IJsland voor het grootste deel uit?",
                a: "Woestijn",
                b: "IJs",
                c: "Toendra",
                answer: "Toendra",
                picture: "ijsland.png"
            }, {
                question: "Welke landen horen niet bij de Eurozone?",
                a: "Noorwegen en Finland",
                b: "Noorwegen en IJsland",
                c: "IJsland en Frankrijk",
                answer: "Noorwegen en IJsland",
                picture: "eurozone.png"
            }, {
                question: "Wat zijn Estland, Letland en Litouwen?",
                a: "Baltische Staten",
                b: "Balkanlanden",
                c: "Benelux",
                answer: "Baltische Staten",
                picture: "baltischestaten.png"
            }, {
                question: "Waar waren Estland, Letland en Litouwen vroeger onderdeel van?",
                a: "Scandinavië",
                b: "Balkanlanden",
                c: "Sovjet Unie",
                answer: "Sovjet Unie",
                picture: "sovjetunie.png"
            }, {
                question: "De waddeneilanden zijn een goed voorbeeld van?",
                a: "Kliffen",
                b: "Afbraakkust",
                c: "Aangroeikust",
                answer: "Aangroeikust",
                picture: "waddeneilanden.png"
            }, {
                question: "Hoe heet het achterland van Rotterdam?",
                a: "Ruhrgebied",
                b: "Ardennen",
                c: "Achterhoek",
                answer: "Ruhrgebied",
                picture: "ruhrarea.png"
            }, {
                question: "Waarom is er in Rotterdam veel werkgelegenheid?",
                a: "Chemische industrie",
                b: "Vee-industrie",
                c: "Levensmiddelen industrie",
                answer: "Chemische industrie",
                picture: "rotterdam.png"
            }
        ]
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

            if (this.player.isCollidingWithBallLeft(this.ball)) {
                this.ball.collidedWithPlayerLeft();
            }

            if (this.player.isCollidingWithBallMiddle(this.ball)) {
                this.ball.collidedWithPlayerMiddle();
            }

            if (this.player.isCollidingWithBallRight(this.ball)) {
                this.ball.collidedWithPlayerRight();
            }

            for (let index = 0; index < this.blockArray.length; index++) {
                this.blockArray[index].draw();
                if (this.ball.isCollidingWithBlock(this.blockArray[index])) {
                    this.ball.collidedWithBlock();
                    this.blockArray.splice(index, 1);
                    if (this.blockArray.length < 1) {
                        alert('Goed gedaan!')
                        location.reload();
                    }
                    if (this.blockArray.length == 12 || this.blockArray.length == 9 || this.blockArray.length == 6 || this.blockArray.length == 3) {
                        this.questionAnswer = null;
                        this.numberRandom = this.canvas.randomNumber(0, this.difficultQuestions.length - 1)
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
            this.canvas.writeImageToCanvas(`./assets/images/question/${this.difficultQuestions[this.numberRandom].picture}`, 25, 210)
            this.canvas.writeTextToCanvas(this.difficultQuestions[this.numberRandom].question, 30, this.canvas.getCenter().X, 50, "white");
            this.canvas.writeTextToCanvas(` 1: ${this.difficultQuestions[this.numberRandom].a}`, 50, this.canvas.getCenter().X - 25, 295, "white", "left");
            this.canvas.writeTextToCanvas(`2: ${this.difficultQuestions[this.numberRandom].b}`, 50, this.canvas.getCenter().X - 25, 395, "white", "left");
            this.canvas.writeTextToCanvas(`3: ${this.difficultQuestions[this.numberRandom].c}`, 50, this.canvas.getCenter().X - 25, 495, "white", "left");
            if (this.keyBoardListener.getOnePressed()) {
                this.questionAnswer = this.difficultQuestions[this.numberRandom].a;
                this.compareAnswers();
            }
            if (this.keyBoardListener.getTwoPressed()) {
                this.questionAnswer = this.difficultQuestions[this.numberRandom].b;
                this.compareAnswers();
            }
            if (this.keyBoardListener.getThreePressed()) {
                this.questionAnswer = this.difficultQuestions[this.numberRandom].c;
                this.compareAnswers();
            }
        }

        if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
            this.player.removeLife();
            this.ball.removeLife();
        }
    }

    compareAnswers = () => {
        if (this.difficultQuestions[this.numberRandom].answer === this.questionAnswer) {
            alert('Goed gedaan! Je antwoord was goed (LET OP: Het spel gaat meteen verder!)')
            this.difficultQuestions.splice(this.numberRandom, 1);
        } else {
            alert(`Helaas! Het goede antwoord was ${this.difficultQuestions[this.numberRandom].answer} (LET OP: Het spel gaat meteen verder!)`);
            this.difficultQuestions.splice(this.numberRandom, 1);
        }
        this.gameState = "PLAY";
        this.canvas.clearCanvas();
        this.keyBoardListener.resetAnswer();
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    }
}