/// <reference path ='Viewbase.ts' />

class StartView extends ViewBase {

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }
    
    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";

        this.canvas.writeTextToCanvas('World Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeImageToCanvas('./assets/images/startscreenButton.png', this.canvas.getCenter().X - 267, this.canvas.getCenter().Y / 2.2);
    }

}