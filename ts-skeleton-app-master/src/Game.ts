///<reference path="Canvas.ts"/>

class Game{

    private readonly canvas: Canvas;
    private readonly ball: Ball;
    private readonly player: Player;
    private readonly block: Block;
    private readonly startView: StartView;
    private readonly continentView: ContinentView;

    public constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.ball = new Ball(canvasElement, './assets/images/balls/football.png', 100, 100, 10, 10, 0);
        this.player = new Player(canvasElement, './assets/images/bluePlayer.png', 200, 200, 100, 10);
        this.block = new Block(canvasElement,'./assets/images/blueBlock.png',50,50,40,40);
        this.startView = new StartView()
    }

    draw = () => {
        this.continentView.createScreen();
    }
}

window.addEventListener('load', init);

function init(): void {
    const gameName = new Game();
    window.setInterval(gameName.draw, 1000/60);
}