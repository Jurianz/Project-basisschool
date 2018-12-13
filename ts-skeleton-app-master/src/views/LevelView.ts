///<reference path="Viewbase.ts"/>

class LevelView extends ViewBase {

    private player: Player;
    private imageArray: Array<string> = ["./assets/images/blocks/blueBlock.png", 
    "./assets/images/blocks/redBlock.png", 
    "./assets/images/blocks/greenBlock.png", 
    "./assets/images/blocks/greyBlock.png",
    "./assets/images/blocks/orangeBlock.png",
    "./assets/images/blocks/purpleBlock.png",
    "./assets/images/blocks/yellowBlock.png"
    ];

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", 500, this.canvas.getHeight() -30, 50, 50, 3)
    }

    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/europa_background.jpg') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";

        this.canvas.writeImageToCanvas(this.imageArray[0], 10, 50);
        this.canvas.writeImageToCanvas(this.imageArray[1], 200, 50);
        this.canvas.writeImageToCanvas(this.imageArray[2], 390, 50);
        this.canvas.writeImageToCanvas(this.imageArray[3], 580, 50);
        this.canvas.writeImageToCanvas(this.imageArray[4], 770, 50);
        this.canvas.writeImageToCanvas(this.imageArray[5], 960, 50);
        this.canvas.writeImageToCanvas(this.imageArray[6], 1150, 50);
        this.canvas.writeImageToCanvas(this.imageArray[1], 1340, 50);
        this.canvas.writeImageToCanvas(this.imageArray[3], 1530, 50);

        this.canvas.writeImageToCanvas(this.imageArray[0], 10, 120);
        this.canvas.writeImageToCanvas(this.imageArray[1], 200, 120);
        this.canvas.writeImageToCanvas(this.imageArray[2], 390, 120);
        this.canvas.writeImageToCanvas(this.imageArray[3], 580, 120);
        this.canvas.writeImageToCanvas(this.imageArray[4], 770, 120);
        this.canvas.writeImageToCanvas(this.imageArray[5], 960, 120);
        this.canvas.writeImageToCanvas(this.imageArray[6], 1150, 120);
        this.canvas.writeImageToCanvas(this.imageArray[1], 1340, 120);
        this.canvas.writeImageToCanvas(this.imageArray[3], 1530, 120);

        this.canvas.clearCanvas();
        this.player.move();
        this.player.draw();
    }


}