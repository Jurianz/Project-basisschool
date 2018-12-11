///<reference path="Canvas.ts"/>

class Game{

    private readonly canvas: Canvas;
    private readonly ball: Ball;
    private readonly player: Player;
    private readonly block: Array<Block>;

    public constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.ball = new Ball(canvasElement, './assets/images/redBall.png', 100, 100, 20, 20, 0);
        this.player = new Player(canvasElement, './assets/images/bluePlayer.png', 400, 600, 100, 10);
    }

    draw = () => {
        this.canvas.clearCanvas();
        this.player.move();
        this.player.draw();
    }

    
}

window.addEventListener('load', init);

function init(): void {
    const gameName = new Game();
    window.setInterval(gameName.draw, 1000/60);
    console.log('in init')
}