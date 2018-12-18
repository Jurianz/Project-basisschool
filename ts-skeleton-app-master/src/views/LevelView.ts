///<reference path="Viewbase.ts"/>
class LevelView extends ViewBase {

    private player: Player;
    private ball: Ball;
    private blockArray: Array<any>;
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
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-2";
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
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
            if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
                this.player.removeLife();
                this.ball.removeLife();
            }
            if (this.player.isCollidingWithBall(this.ball)) {
                this.ball.collidedWithPlayer();
            }
            for (let index = 0; index < this.blockArray.length; index++) {
                this.blockArray[index].draw();
                if (this.ball.isCollidingWithBlock(this.blockArray[index])) {
                    this.ball.collidedWithBlock();
                    this.blockArray.splice(index, 1);
                }
            }
            if (this.blockArray.length < 1) {
                alert('Goed gedaan!')
                location.reload();
            }


            if (this.blockArray.length == 15) {
                this.gameState = "QUESTION";
                document.body.style.background = "url('./assets/images/backgrounds/questionView.png') no-repeat ";
                document.body.style.backgroundSize = "cover";
                document.body.style.zIndex = "-2";
                const question = new Question();
                window.setInterval(question.createScreen, 1000 / 60)
                if (question.getGameState() === "PLAY") {
                    this.compareAnswers()
                    this.gameState = "PLAY";
                }
            }
        }
    }

    compareAnswers = () => {
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-2";
    }
}

