abstract class ViewBase {

    protected canvas: Canvas;
    protected gameState: string;

    protected constructor() {
        this.gameState = "PLAY";
    }

    public render(): void{
        this.canvas.clearCanvas();
        this.createScreen();
    }

    protected abstract createScreen(): void 
}