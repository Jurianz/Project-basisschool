///<reference path="Viewbase.ts"/>

class DifficultyView extends ViewBase {

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }

    createScreen() {
        this.canvas.clearCanvas();
    }
}