///<reference path="Viewbase.ts"/>
class LevelView extends ViewBase {
    private player: Player;
    private ball: Ball;
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
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", 500, this.canvas.getHeight() - 30, 200, 25)
        this.ball = new Ball(canvasElement, "./assets/images/balls/redball.png", 900, 500, 35, 35)
        window.setInterval(this.createScreen, 1000 / 60)
    }

    createScreen = () => {
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
        } else {
            this.canvas.writeTextToCanvas(`lives: ${this.player.getLives()}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
            this.ball.move();
            this.ball.draw();
            for (let i = 10; i < this.canvas.getWidth() - 190; i += 190) {
                this.canvas.writeImageToCanvas(this.imageArray[1], i, 30);
                // this.canvas.writeImageToCanvas(this.imageArray[0], 10, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[1], 200, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[2], 390, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[3], 580, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[4], 770, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[5], 960, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[6], 1150, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[1], 1340, 50);
                // this.canvas.writeImageToCanvas(this.imageArray[0], 10, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[1], 200, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[2], 390, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[3], 580, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[4], 770, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[5], 960, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[6], 1150, 120);
                // this.canvas.writeImageToCanvas(this.imageArray[1], 1340, 120);
            }
        }
    }
}